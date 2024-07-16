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
      <SectionEdit courseDetails={courseDetails} />
    </>
  );
}
