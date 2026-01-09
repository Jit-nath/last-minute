"use server";

import { db } from "@/db";

import { savedLinks } from "@/db/schema/schema";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { eq, desc, asc, and, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getSessionUser() {
  const session = await getServerSession(authOptions);
  console.log("getSessionUser - session:", JSON.stringify(session, null, 2));
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session.user.email;
}

export async function getSavedLinks(sessionId?: number) {
  const session = await getServerSession(authOptions);

  // Return empty array for unauthenticated users (graceful handling)
  if (!session?.user?.email) {
    return [];
  }

  const userId = session.user.email;

  if (sessionId) {
    return await db
      .select()
      .from(savedLinks)
      .where(
        and(eq(savedLinks.userId, userId), eq(savedLinks.sessionId, sessionId))
      )
      .orderBy(asc(savedLinks.position), desc(savedLinks.createdAt));
  } else {
    return await db
      .select()
      .from(savedLinks)
      .where(and(eq(savedLinks.userId, userId), isNull(savedLinks.sessionId)))
      .orderBy(asc(savedLinks.position), desc(savedLinks.createdAt));
  }
}

export async function saveLink(
  url: string,
  title?: string,
  thumbnail?: string,
  sessionId?: number
) {
  const userId = await getSessionUser();

  const whereClause = sessionId
    ? and(eq(savedLinks.userId, userId), eq(savedLinks.sessionId, sessionId))
    : and(eq(savedLinks.userId, userId), isNull(savedLinks.sessionId));

  const existingLinks = await db
    .select({ position: savedLinks.position })
    .from(savedLinks)
    .where(whereClause)
    .orderBy(desc(savedLinks.position))
    .limit(1);

  const nextPosition = (existingLinks[0]?.position ?? -1) + 1;

  await db.insert(savedLinks).values({
    userId,
    sessionId: sessionId || null,
    url,
    title: title || "Untitled Video",
    thumbnail: thumbnail || "",
    position: nextPosition,
  });

  revalidatePath("/session");
}

export async function updateLinkPositions(
  updates: { id: number; position: number }[]
) {
  const userId = await getSessionUser();

  await db.transaction(async (tx) => {
    for (const update of updates) {
      await tx
        .update(savedLinks)
        .set({ position: update.position })
        .where(
          and(eq(savedLinks.id, update.id), eq(savedLinks.userId, userId))
        );
    }
  });

  revalidatePath("/session");
}

export async function toggleLock(id: number) {
  const userId = await getSessionUser();

  const link = await db.query.savedLinks.findFirst({
    where: (links, { eq, and }) =>
      and(eq(links.id, id), eq(links.userId, userId)),
  });

  if (!link) return;

  await db
    .update(savedLinks)
    .set({ isLocked: !link.isLocked })
    .where(eq(savedLinks.id, id));

  revalidatePath("/session");
}

export async function deleteLink(id: number) {
  const userId = await getSessionUser();

  await db
    .delete(savedLinks)
    .where(and(eq(savedLinks.id, id), eq(savedLinks.userId, userId)));

  revalidatePath("/session");
}
