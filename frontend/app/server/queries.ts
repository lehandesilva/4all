import "server-only";
import {
  Courses_for_page,
  CurrentUserCourses,
  section_for_section,
} from "../../../shared/definitions";
import { cookies } from "next/headers";

export async function fetchReviews(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/course/reviews/${courseId}`,
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
    return resData.result;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchCourseDeets(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/course/${courseId}`,
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
    return resData.result;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchSectionById(courseId: string, sectionId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/course/${courseId}/${sectionId}`,
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

    const resData: { result: section_for_section } = await response.json();
    return resData.result;
  } catch (error) {
    return { error: true, message: "Error fetching Data" };
  }
}

export async function fetchAllSectionsOfCourse(courseId: string) {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/course/${courseId}/sections`,
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
    `${process.env.BACKEND_API_URL}/users/${userId}/courses`,
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
  console.log(process.env.BACKEND_API_URL);
  const response = await fetch(`${process.env.BACKEND_API_URL}/course`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.log("error");
  }

  const data: Courses_for_page[] = await response.json(); // Parse the JSON
  return data;
}

export default async function fetchCategories() {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
      cache: "no-store",
    });
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
