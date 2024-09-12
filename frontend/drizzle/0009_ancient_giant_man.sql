CREATE TABLE IF NOT EXISTS "sections" (
	"id" text PRIMARY KEY NOT NULL,
	"instructor_id" text,
	"name" text NOT NULL,
	"blocks" jsonb
);
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "instructor_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "instructor_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "img_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "public" boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sections" ADD CONSTRAINT "sections_instructor_id_user_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
