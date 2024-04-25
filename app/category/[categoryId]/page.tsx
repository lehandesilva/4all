import { fetchCategoryName, fetchCoursesByCategory } from "@/app/lib/data";
import CoursesGrid from "@/app/ui/courses-grid";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const courses = await fetchCoursesByCategory(params.categoryId);
  const categoryName = await fetchCategoryName(params.categoryId);
  if (!courses) {
    return (
      <>
        <p>No courses to display</p>
      </>
    );
  }
  return (
    <>
      <h1></h1>
      <CoursesGrid
        heading={`Courses from our ${categoryName} section`}
        data={
          courses as {
            id: string;
            name: string;
            instructor_name: string;
            rating: string;
            img_url: string;
          }[]
        }
      />
    </>
  );
}
