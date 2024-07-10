import { sql } from "@vercel/postgres";
import {
  User,
  Course,
  CourseMaterial,
  block,
  Category,
} from "../server/definitions";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function fetchCoursesByQuery(queryString: string) {
  try {
    const sanitizedQuery = queryString.replace(
      /[-[\]{}()*+?.,\\^$|:]/g,
      "\\$&"
    ); // Escape special characters
    const result = await sql`
      SELECT id, name, instructor_name, rating, img_url 
      FROM courses
      WHERE LOWER(name) ILIKE  ${`%${sanitizedQuery}%`}
        OR LOWER(instructor_name) ILIKE  ${`%${sanitizedQuery}%`}
    `;
    return result.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get courses by query" };
  }
}

export async function fetchCourses() {
  try {
    const result = await sql`
      SELECT id, name, instructor_name, rating, img_url 
      FROM courses
    `;
    return result.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get courses" };
  }
}

export async function fetchCoursesByCategory(categoryId: string) {
  try {
    const results = await sql`
      SELECT id, name, instructor_name, rating, img_url
      FROM courses
      WHERE category_id = ${categoryId}
    `;
    if (results.rows.length === 0) {
      return []; // Return an empty array if no courses found
    }

    return results.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get courses" };
  }
}

export async function fetchCategoryName(category_id: string) {
  try {
    const result = await sql`
      SELECT name
      FROM categories
      WHERE id = ${category_id}
    `;
    return result.rows[0].name;
  } catch (error) {}
}

export async function fetchCourseById(id: string) {
  noStore();
  try {
    const result = await sql<Course>`
    SELECT *
    FROM courses
    WHERE id = ${id}
  `;

    // Check if a course was found
    if (result.rows.length === 0) {
      return null;
    }

    // Return the first row (assuming there should be only one course with the ID)
    return result.rows[0];
  } catch (error) {}
}

export async function fetchCourseMaterialById(id: string) {
  try {
    const result = await sql<CourseMaterial>`
    SELECT *
    FROM course_material
    WHERE id = ${id}
  `;

    // Check if course material was found
    if (result.rows.length === 0) {
      return null;
    }

    // Return the first row (assuming there should be only one material with the ID)
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    return { message: "Error fetching course section" };
  }
}

export async function fetchUserByEmail(email: string) {
  noStore();
  try {
    const result = await sql<User>`
      SELECT id, name, email
      FROM users
      WHERE email = ${email}
    `;

    if (result.rows.length === 0) {
      return null; // No user found with the email
    }

    const user = result.rows[0];
    return user;
  } catch (error) {
    return { message: "Database Error: Failed to user" };
  }
}

export async function fetchCoursesByInstructorId(instructorId: string) {
  noStore();
  try {
    const result = await sql`
    SELECT id, name, rating, img_url
    FROM courses
    WHERE instructor_id = ${instructorId}
  `;

    // Check if any courses were found
    if (result.rows.length === 0) {
      return []; // Return an empty array if no courses found
    }

    return result.rows;
  } catch (error) {
    return { message: "Database Error: Failed to get courses by instructor" };
  }
}

export async function fetchCategories() {
  try {
    const result = await sql<Category>`
    SELECT *
    FROM categories
  `;

    // Check if any courses were found
    if (result.rows.length === 0) {
      return []; // Return an empty array if no courses found
    }

    return result.rows;
  } catch (error) {
    return [];
  }
}
