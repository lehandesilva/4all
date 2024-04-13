import { fetchCourseMaterialById } from "@/app/lib/data";
import CourseContent from "@/app/ui/course/course-content";

export default async function Page({ params }: { params: { matId: string } }) {
  const content = await fetchCourseMaterialById(params.matId);
  if (!content) {
    return <div>Content Not found</div>;
  }
  return (
    <>
      <CourseContent content={content} />
    </>
  );
}
