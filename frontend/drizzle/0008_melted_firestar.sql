ALTER TABLE "categories_table" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "courses_table" RENAME TO "courses";--> statement-breakpoint
ALTER TABLE "reviews_table" RENAME TO "reviews";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_table_category_id_categories_table_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_table_course_id_courses_table_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_table_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "users_rated" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "category_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "instructor_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_user_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
