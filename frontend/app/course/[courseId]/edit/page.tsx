import { section_for_section } from "@/frontend/app/server/definitions";
import {
  fetchCourseDeets,
  fetchSectionById,
} from "@/frontend/app/server/queries";
import SectionEdit from "@/frontend/app/ui/editor/section-edit";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createId } from "@/frontend/app/lib/util";

export default async function Page({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { sectionId?: string };
}) {
  const sectionId = searchParams?.sectionId;
  const session = await auth();
  const courseDetails = await fetchCourseDeets(params.courseId);
  if (session?.user.id !== courseDetails.instructor_id) {
    redirect("/");
  }
  let sectionData: section_for_section | null = null;
  if (sectionId) {
    if (sectionId === "new") {
      sectionData = {
        id: "new",
        instructor_id: session.user.id,
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
      sectionData = await fetchSectionById(sectionId);
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
