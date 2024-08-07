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
import type { AdapterAccountType } from "next-auth/adapters";
import { section_for_course, history, block } from "../definitions";

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

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

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
