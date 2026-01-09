import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const studySessions = pgTable("study_sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  videoUrl: text("video_url").notNull(),
  lastPosition: integer("last_position").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  shareId: text("share_id").notNull().unique(),
  name: text("name").notNull(),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const savedLinks = pgTable("saved_links", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  sessionId: integer("session_id").references(() => sessions.id, {
    onDelete: "cascade",
  }),
  url: text("url").notNull(),
  title: text("title"),
  thumbnail: text("thumbnail"),
  position: integer("position").default(0),
  isLocked: boolean("is_locked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionMessages = pgTable("session_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  sender: text("sender").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionNotes = pgTable("session_notes", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
