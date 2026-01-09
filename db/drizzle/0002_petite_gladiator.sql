CREATE TABLE "session_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"content" text NOT NULL,
	"sender" text DEFAULT 'user',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"share_id" text NOT NULL,
	"name" text NOT NULL,
	"is_public" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "sessions_share_id_unique" UNIQUE("share_id")
);
--> statement-breakpoint
ALTER TABLE "saved_links" ADD COLUMN "session_id" integer;--> statement-breakpoint
ALTER TABLE "session_messages" ADD CONSTRAINT "session_messages_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_notes" ADD CONSTRAINT "session_notes_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_links" ADD CONSTRAINT "saved_links_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;