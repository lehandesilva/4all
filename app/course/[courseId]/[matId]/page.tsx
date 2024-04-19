import { fetchCourseMaterialById } from "@/app/lib/data";
import CourseContent from "@/app/ui/course/course-content";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { matId: string } }) {
  const content = await fetchCourseMaterialById(params.matId);
  if (!content) {
    notFound();
  }
  return (
    <>
      <CourseContent content={content} />
    </>
  );
}
