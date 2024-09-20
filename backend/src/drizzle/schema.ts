import {
  integer,
  primaryKey,
  pgEnum,
  pgTable,
  text,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import {
  section_for_course,
  history,
  block,
} from "../../../shared/definitions";

export const roleEnum = pgEnum("role", ["admin", "user", "paidUser"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password").notNull(),
  image: text("image"),
  role: text("role").notNull(),
  history: jsonb("history").$type<history[]>(),
  age: text("age").notNull(),
});

export const categoriesTable = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  href: text("href").notNull(),
});

export const coursesTable = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  description: text("description"),
  instructor_id: text("instructor_id").references(() => users.id),
  instructor_name: text("instructor_name"),
  public: boolean("public"),
  rating: text("rating"),
  users_rated: integer("users_rated"),
  img_url: text("img_url"),
  category_id: text("category_id").references(() => categoriesTable.id),
  sections: jsonb("sections").$type<section_for_course[]>(),
});

export const reviewsTable = pgTable("reviews", {
  review_id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  course_id: text("course_id").references(() => coursesTable.id),
  user_id: text("user_id").references(() => users.id),
  user_name: text("user_name"),
  comment: text("comment").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const sectionsTable = pgTable("sections", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  instructor_id: text("instructor_id").references(() => users.id),
  name: text("name").notNull(),
  blocks: jsonb("blocks").$type<block[]>(),
});
