import CreateSections from "@/app/ui/profile/create-sections";
export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params; // Extract courseId
  return (
    <>
      <CreateSections courseId={courseId} />
    </>
  );
}
