"use server";

import { db } from "@/db";
import {
  sessions,
  savedLinks,
  sessionMessages,
  sessionNotes,
} from "@/db/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";

// Helper to generate random ID
function generateShareId() {
  return randomBytes(8).toString("hex");
}

export async function createSession(data: {
  name: string;
  links: {
    url: string;
    title?: string;
    thumbnail?: string;
    position?: number;
    isLocked?: boolean;
  }[];
  messages: { content: string; sender: string }[];
  notes: { content: string }[];
}) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("Unauthorized");
  }

  const shareId = generateShareId();

  // Create Session
  const [newSession] = await db
    .insert(sessions)
    .values({
      userId: userEmail,
      shareId: shareId,
      name: data.name,
      isPublic: true,
    })
    .returning();

  const sessionId = newSession.id;

  // Bulk Insert Links
  if (data.links.length > 0) {
    await db.insert(savedLinks).values(
      data.links.map((link) => ({
        userId: userEmail,
        sessionId: sessionId,
        url: link.url,
        title: link.title,
        thumbnail: link.thumbnail,
        position: link.position || 0,
        isLocked: link.isLocked || false,
      }))
    );
  }

  // Bulk Insert Messages
  if (data.messages.length > 0) {
    await db.insert(sessionMessages).values(
      data.messages.map((msg) => ({
        sessionId: sessionId,
        content: msg.content,
        sender: msg.sender,
      }))
    );
  }

  // Bulk Insert Notes
  if (data.notes.length > 0) {
    await db.insert(sessionNotes).values(
      data.notes.map((note) => ({
        sessionId: sessionId,
        content: note.content,
      }))
    );
  }

  return shareId;
}

export async function getSharedSession(shareId: string) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const foundSession = await db.query.sessions.findFirst({
    where: eq(sessions.shareId, shareId),
  });

  if (!foundSession) return null;

  const isAuthor = userEmail === foundSession.userId;

  // Access check: if not public and not author, deny (optional, currently defaults public)
  // if (!foundSession.isPublic && !isAuthor) return null;

  // Fetch related data
  const links = await db.query.savedLinks.findMany({
    where: eq(savedLinks.sessionId, foundSession.id),
    orderBy: [savedLinks.position],
  });

  const messages = await db.query.sessionMessages.findMany({
    where: eq(sessionMessages.sessionId, foundSession.id),
    orderBy: [sessionMessages.createdAt],
  });

  const notes = await db.query.sessionNotes.findMany({
    where: eq(sessionNotes.sessionId, foundSession.id),
    orderBy: [sessionNotes.createdAt],
  });

  return {
    ...foundSession,
    isAuthor,
    links,
    messages,
    notes,
  };
}

export async function getUserSessions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return [];

  return await db.query.sessions.findMany({
    where: eq(sessions.userId, session.user.email),
    orderBy: [desc(sessions.createdAt)],
  });
}

// Incremental Updates for Live Session
export async function addSessionMessage(
  sessionId: number,
  content: string,
  sender: string = "user"
) {
  // Ideally verify user owns session or has write access
  await db.insert(sessionMessages).values({
    sessionId,
    content,
    sender,
  });
}

export async function addSessionNote(sessionId: number, content: string) {
  await db.insert(sessionNotes).values({
    sessionId,
    content,
  });
}
