import "server-only";
import { postgresDB } from "./db/postgresDB";
import {
  categoriesTable,
  coursesTable,
  reviewsTable,
  sectionsTable,
  users,
} from "./db/schema";
import { eq } from "drizzle-orm";

export async function fetchReviews(courseId: string) {
  const result = await postgresDB
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.course_id, courseId));

  return result;
}
export async function fetchCourseDeets(courseId: string) {
  const result = await postgresDB
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));
  return result[0];
}

export default async function fetchCategories() {
  const result = await postgresDB.select().from(categoriesTable);

  return result;
}

export async function checkEmailExists(email: string) {
  const result = await postgresDB
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, email));

  return result;
}

export async function fetchUserById(id: string) {
  const result = await postgresDB.select().from(users).where(eq(users.id, id));

  return result[0];
}

export async function fetchUserByEmail(email: string) {
  const result = await postgresDB
    .select()
    .from(users)
    .where(eq(users.email, email));

  return result[0];
}

export async function fetchSectionById(sectionId: string) {
  const result = await postgresDB
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.id, sectionId));

  return result[0];
}

export async function fetchAllSectionsOfCourse(courseId: string) {
  const sectionResults = await postgresDB
    .select({ sections: coursesTable.sections })
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));

  return sectionResults[0];
}

export async function fetchAllCoursesByCurrentUser(userId: string) {
  const result = await postgresDB
    .select({
      id: coursesTable.id,
      name: coursesTable.name,
      public: coursesTable.public,
      rating: coursesTable.rating,
      img_url: coursesTable.img_url,
      category_id: coursesTable.category_id,
    })
    .from(coursesTable)
    .where(eq(coursesTable.instructor_id, userId));

  return result;
}

export async function fetchCoursesForHomePage() {
  const result = await postgresDB
    .select({
      id: coursesTable.id,
      name: coursesTable.name,
      instructor_name: coursesTable.instructor_name,
      rating: coursesTable.rating,
      img_url: coursesTable.img_url,
    })
    .from(coursesTable)
    .where(eq(coursesTable.public, true));
  return result;
}
