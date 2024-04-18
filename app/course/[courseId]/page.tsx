import CourseDetails from "@/app/ui/course/course-details";
import { fetchCourseById } from "@/app/lib/data";
import AddComment from "@/app/ui/course/add-comment";
import CommentSection from "@/app/ui/course/comments";
import RateCourse from "@/app/ui/course/rate-course";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseById(params.courseId);
  const { courseId } = params; // Extract courseId
  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <>
      <CourseDetails course={course} />
      <RateCourse courseId={courseId} />
      <AddComment courseId={courseId} />
      <CommentSection comments={course.reviews} />
    </>
  );
}
