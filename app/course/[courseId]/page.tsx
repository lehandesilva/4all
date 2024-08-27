import CourseDetails from "@/app/ui/course/course-details";
import { notFound } from "next/navigation";
import { fetchCourseDeets } from "@/app/server/queries";
import { auth } from "@/auth";
import AddSections from "@/app/ui/course/add-sections";
import Reviews from "@/app/ui/course/reviews";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseDeets(params.courseId);
  const session = await auth();
  if (!course) {
    notFound();
  }
  return (
    <>
      <CourseDetails course={course} />
      <Reviews courseId={course.id} />
      {/* {session?.user.id === course.instructor_id && (
        <AddSections courseId={course.id} />
      )} */}
    </>
  );
}
