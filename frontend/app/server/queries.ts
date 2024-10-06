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
import {
  Courses_for_page,
  CurrentUserCourses,
} from "../../../shared/definitions";
import { cookies } from "next/headers";

export async function fetchReviews(courseId: string) {
  const result = await postgresDB
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.course_id, courseId));

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

////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchCourseDeets(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(`${process.env.API_URL}/course/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const resData = await response.json();
      return resData.message;
    }

    const resData = await response.json();
    return resData.result;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export default async function fetchCategories() {
  try {
    const response = await fetch(`${process.env.API_URL}/categories`);
    if (!response.ok) {
      const resData = await response.json();
      return resData.message;
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchSectionById(courseId: string, sectionId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/course/${courseId}/${sectionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const resData = await response.json();
      return resData.message;
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchAllSectionsOfCourse(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.API_URL}/course/${courseId}/sections`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const resData = await response.json();
      return resData.message;
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchAllCoursesByCurrentUser(userId: string) {
  const token = cookies().get("token")?.value;
  const response = await fetch(
    `${process.env.API_URL}/users/${userId}/courses`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: CurrentUserCourses[] = await response.json(); // Parse the JSON
  return data;
}

export async function fetchCoursesForHomePage() {
  const response = await fetch(`${process.env.API_URL}/course`);

  if (!response.ok) {
    console.log("error");
  }

  const data: Courses_for_page[] = await response.json(); // Parse the JSON
  return data;
}
