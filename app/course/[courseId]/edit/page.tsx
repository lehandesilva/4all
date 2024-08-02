import { section_for_section, newSection } from "@/app/server/definitions";
import {
  fetchAllSectionsOfCourse,
  fetchCourseDeets,
  fetchSectionById,
} from "@/app/server/queries";
import SectionEdit from "@/app/ui/editor/section-edit";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
  let sectionData: section_for_section | newSection | null = null;
  if (sectionId) {
    if (sectionId === "new") {
      sectionData = {
        name: "Untitled Section",
        blocks: [
          {
            type: "text",
            content: "Add something here...",
            style: {
              color: "black",
              size: 2,
              align: "center",
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
