CREATE TABLE "saved_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"thumbnail" text,
	"position" integer DEFAULT 0,
	"is_locked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "study_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"video_url" text NOT NULL,
	"last_position" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "session" CASCADE;