import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
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
  user_id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  age: text("age").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  history: jsonb("history").$type<history[]>(),
  role: text("role").notNull(),
});

export const categoriesTable = pgTable("categories_table", {
  cat_Id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  href: text("href").notNull(),
});

export const coursesTable = pgTable("courses_table", {
  course_id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  instructor_name: text("instructor_name").notNull(),
  rating: text("rating").notNull(),
  users_rated: integer("users_rated").notNull(),
  img_url: text("img_url").notNull(),
  category_id: uuid("category_id").references(() => categoriesTable.cat_Id),
  sections: jsonb("sections").$type<section[]>(),
});

export const reviewsTable = pgTable("reviews_table", {
  review_id: uuid("id").defaultRandom().primaryKey(),
  course_id: uuid("course_id").references(() => coursesTable.course_id),
  user_id: uuid("user_id").references(() => usersTable.user_id),
  comment: text("comment").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
