import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export type section = {
  id: number;
  name: string;
};

export type history = {
  course_id: number;
  section_id: number;
};

export const roleEnum = pgEnum("role", ["admin", "user", "paidUser"]);

export const usersTable = pgTable("users_table", {
  user_id: serial("userId").primaryKey(),
  name: text("name").notNull(),
  age: text("age").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  history: jsonb("history").$type<history[]>(),
  role: text("role").notNull(),
});

export const categoriesTable = pgTable("categories_table", {
  cat_Id: serial("categoryId").primaryKey(),
  name: text("name").notNull(),
  href: text("href").notNull(),
});

export const coursesTable = pgTable("courses_table", {
  course_id: serial("courseId").primaryKey(),
  name: text("name").notNull(),
  instructor_name: text("instructor_name").notNull(),
  rating: text("rating").notNull(),
  users_rated: integer("users_rated").notNull(),
  img_url: text("img_url").notNull(),
  category_id: integer("category_id").references(() => categoriesTable.cat_Id),
  sections: jsonb("sections").$type<section[]>(),
});

export const reviewsTable = pgTable("reviews_table", {
  review_id: serial("review_id").primaryKey(),
  course_id: integer("course_id").references(() => coursesTable.course_id),
  user_id: integer("user_id").references(() => usersTable.user_id),
  comment: text("comment").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
