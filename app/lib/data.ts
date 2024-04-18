import { sql } from "@vercel/postgres";
import { User, Course, CourseMaterial, block, Category } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCourseById(id: string) {
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
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch course data");
  }
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
    return result.rows[0];
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch course data");
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
    console.error("Database error: ", error);
    throw new Error("Failed to fetch user");
  }
}

// Thumbnail data fetch query
// it shouldnt include stuff like description and shit

// export async function fetchCoursesByInstructorId(instructorId: string) {
//   noStore();
//   try {
//     const result = await sql<Course>`
//     SELECT
//     FROM courses
//     WHERE instructor_id = ${instructorId}
//   `;

//     // Check if any courses were found
//     if (result.rows.length === 0) {
//       return []; // Return an empty array if no courses found
//     }

//     return result.rows;
//   } catch (error) {
//     console.error("Database error: ", error);
//     throw new Error("Failed to fetch courses by instructor");
//   }
// }

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
    console.error("Database error: ", error);
    throw new Error("Failed to fetch categories");
  }
}
