import { fetchCourseDeets } from "@/app/server/queries";
import SectionEdit from "@/app/ui/editor/section-edit";
export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const courseDetails = await fetchCourseDeets(params.courseId);
  return (
    <>
      <p>Editing Page</p>
      <SectionEdit
        courseSections={courseDetails.sections}
        courseId={courseDetails.id}
      />
    </>
  );
}
