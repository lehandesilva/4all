ALTER TABLE "categories_table" RENAME COLUMN "categoryId" TO "id";--> statement-breakpoint
ALTER TABLE "courses_table" RENAME COLUMN "courseId" TO "id";--> statement-breakpoint
ALTER TABLE "reviews_table" RENAME COLUMN "review_id" TO "id";--> statement-breakpoint
ALTER TABLE "users_table" RENAME COLUMN "userId" TO "id";--> statement-breakpoint
ALTER TABLE "courses_table" DROP CONSTRAINT "courses_table_category_id_categories_table_categoryId_fk";
--> statement-breakpoint
ALTER TABLE "reviews_table" DROP CONSTRAINT "reviews_table_course_id_courses_table_courseId_fk";
--> statement-breakpoint
ALTER TABLE "reviews_table" DROP CONSTRAINT "reviews_table_user_id_users_table_userId_fk";
--> statement-breakpoint
ALTER TABLE "categories_table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "categories_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "courses_table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "courses_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "courses_table" ALTER COLUMN "category_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews_table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "reviews_table" ALTER COLUMN "course_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "reviews_table" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses_table" ADD CONSTRAINT "courses_table_category_id_categories_table_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_course_id_courses_table_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
