import CourseDetails from "@/app/ui/course/course-details";
import { notFound } from "next/navigation";
import { fetchCourseDeets } from "@/app/server/queries";
import Reviews from "@/app/ui/course/reviews";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseDeets(params.courseId);
  if (!course) {
    notFound();
  }
  return (
    <>
      <CourseDetails course={course} />
      <Reviews courseId={course.id} />
    </>
  );
}
