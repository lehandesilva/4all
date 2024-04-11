import CourseDetails from "@/app/ui/course/course-details";
import { fetchCourseById } from "@/app/lib/data";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseById(params.courseId);
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <>
      <CourseDetails course={course} />
    </>
  );
}
