"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionsTable = exports.reviewsTable = exports.coursesTable = exports.categoriesTable = exports.users = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "paidUser"]);
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    image: (0, pg_core_1.text)("image"),
    role: (0, pg_core_1.text)("role").notNull(),
    history: (0, pg_core_1.jsonb)("history").$type(),
    age: (0, pg_core_1.text)("age").notNull(),
});
exports.categoriesTable = (0, pg_core_1.pgTable)("categories", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: (0, pg_core_1.text)("name").notNull(),
    href: (0, pg_core_1.text)("href").notNull(),
});
exports.coursesTable = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: (0, pg_core_1.text)("name"),
    description: (0, pg_core_1.text)("description"),
    instructor_id: (0, pg_core_1.text)("instructor_id").references(() => exports.users.id),
    instructor_name: (0, pg_core_1.text)("instructor_name"),
    public: (0, pg_core_1.boolean)("public"),
    rating: (0, pg_core_1.text)("rating"),
    users_rated: (0, pg_core_1.integer)("users_rated"),
    img_url: (0, pg_core_1.text)("img_url"),
    category_id: (0, pg_core_1.text)("category_id").references(() => exports.categoriesTable.id),
    sections: (0, pg_core_1.jsonb)("sections").$type(),
});
exports.reviewsTable = (0, pg_core_1.pgTable)("reviews", {
    review_id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    course_id: (0, pg_core_1.text)("course_id").references(() => exports.coursesTable.id),
    user_id: (0, pg_core_1.text)("user_id").references(() => exports.users.id),
    user_name: (0, pg_core_1.text)("user_name"),
    comment: (0, pg_core_1.text)("comment").notNull(),
    timestamp: (0, pg_core_1.timestamp)("timestamp").defaultNow(),
});
exports.sectionsTable = (0, pg_core_1.pgTable)("sections", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    instructor_id: (0, pg_core_1.text)("instructor_id").references(() => exports.users.id),
    name: (0, pg_core_1.text)("name").notNull(),
    blocks: (0, pg_core_1.jsonb)("blocks").$type(),
});
