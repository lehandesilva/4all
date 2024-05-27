import {
  integer,
  primaryKey,
  pgEnum,
  pgTable,
  text,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export type section = {
  id: number;
  name: string;
};

export type history = {
  course_id: number;
  section_id: number;
};

export const roleEnum = pgEnum("role", ["admin", "user", "paidUser"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
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

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

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
  user_id: text("user_id").references(() => users.id),
  comment: text("comment").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});
