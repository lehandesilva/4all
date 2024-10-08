import { section_for_section } from "@/app/server/definitions";
import { fetchCourseDeets, fetchSectionById } from "@/app/server/queries";
import SectionEdit from "@/app/ui/editor/section-edit";
import { redirect } from "next/navigation";
import { createId } from "@/app/lib/util";
import { userAuthCheck } from "@/app/server/actions";

export default async function Page({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { sectionId?: string };
}) {
  const user = await userAuthCheck();
  const courseId = params.courseId;
  const sectionId = searchParams?.sectionId;
  const courseDetails = await fetchCourseDeets(params.courseId);
  if (user?.id !== courseDetails.instructor_id || user === null) {
    redirect("/");
  }
  let sectionData: section_for_section | null = null;
  if (sectionId) {
    if (sectionId === "new") {
      sectionData = {
        id: "new",
        instructor_id: user.id,
        name: "Untitled Section",
        blocks: [
          {
            id: createId(),
            type: "text",
            content: "Add Something",
            style: {
              color: "black",
              size: 2,
              align: "left",
            },
          },
        ],
      };
    } else {
      sectionData = await fetchSectionById(courseId, sectionId);
    }
  }
  return (
    <>
      <SectionEdit
        courseDetails={courseDetails}
        sectionData={sectionData || null}
        sectionId={sectionId}
      />
    </>
  );
}
