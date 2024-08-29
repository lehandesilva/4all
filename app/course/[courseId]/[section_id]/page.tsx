import {
  fetchAllSectionsOfCourse,
  fetchSectionById,
} from "@/app/server/queries";
import Block from "@/app/ui/course/blocks";
import { notFound } from "next/navigation";
import SectionMenu from "@/app/ui/course/menu";

export default async function Page({
  params,
}: {
  params: { courseId: string; section_id: string };
}) {
  const section = await fetchSectionById(params.section_id);
  const { sections } = await fetchAllSectionsOfCourse(params.courseId);
  if (!section) {
    notFound();
  }
  return (
    <>
      <div className="w-full flex flex-col items-center mt-16">
        <SectionMenu
          sectionName={section.name}
          all_sections_details={sections}
          currentSectionId={params.section_id}
        />
        <div className="mt-16 flex flex-col items-center w-4/5">
          {section.blocks?.map((block, index) => (
            <div key={index}>
              <Block block={block} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Get the blocks and display whatever the fuck they have on it. Videos/ iamges/ text and subtitles.
// The heading should be on top
// Have a next and previous button for the sections
//
