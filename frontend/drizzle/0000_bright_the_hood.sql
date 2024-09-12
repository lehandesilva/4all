DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'paidUser');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories_table" (
	"categoryId" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"href" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses_table" (
	"courseId" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"instructor_name" text NOT NULL,
	"rating" text NOT NULL,
	"users_rated" integer NOT NULL,
	"img_url" text NOT NULL,
	"category_id" integer,
	"sections" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews_table" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"user_id" integer,
	"comment" text NOT NULL,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"userId" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"history" jsonb,
	"role" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses_table" ADD CONSTRAINT "courses_table_category_id_categories_table_categoryId_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories_table"("categoryId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_course_id_courses_table_courseId_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses_table"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews_table" ADD CONSTRAINT "reviews_table_user_id_users_table_userId_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
