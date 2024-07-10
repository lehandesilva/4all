import CourseDetails from "@/app/ui/course/course-details";
import AddComment from "@/app/ui/course/add-comment";
import CommentSection from "@/app/ui/course/comments";
import RateCourse from "@/app/ui/course/rate-course";
import { notFound } from "next/navigation";
import { fetchCourseDeets } from "@/app/server/queries";
import { auth } from "@/auth";
import AddSections from "@/app/ui/course/add-sections";

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
      {session?.user.id === course.instructor_id &&
        course.sections === null && <AddSections />}
      {/* <RateCourse courseId={courseId} />
      <AddComment courseId={courseId} />
      <CommentSection
        comments={course.reviews !== null ? course.reviews : []}
      /> */}
    </>
  );
}
