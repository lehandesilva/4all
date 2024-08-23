import EditorTest from "./editor-test";
import { Course, section_for_section } from "@/app/server/definitions";
import SectionMap from "./sectionMap";
import { EditCouseDetails } from "./editCouseDetails";
import TogglePublic from "./togglePublic";

// This page should have a side panel with all the sections that are available and an additional
// button to add a new section. Import the course details and map the sections to the section edit
// component. The add new section button would also be on the section edit component.

// when a section is selected have to fetch section from mongo and pass to editor component
// editor should preload the blocks and keep. Make videos playable on editor.

// each section will contain a id, name, blocks<Array>
// each block will contain type, content and style
// page needs the course sections from postgres to import the sections from mongodb

export default function SectionEdit({
  courseDetails,
  sectionData,
  sectionId,
}: {
  courseDetails: Course;
  sectionData: section_for_section | null;
  sectionId: string | undefined;
}) {
  return (
    <>
      <div className="ml-8 flex justify-between items-center">
        <h1 className="ml-10 mb-4 mt-6 text-3xl bg-transparent text-s-3">
          {courseDetails.name}
        </h1>
        <TogglePublic
          coursePublic={courseDetails.public}
          courseId={courseDetails.id!}
        />
      </div>
      <div className="flex border-t-2 w-full">
        <SectionMap
          sections={courseDetails.sections}
          sectionId={sectionId}
          courseId={courseDetails.id!}
        />
        {sectionData ? (
          <EditorTest courseId={courseDetails.id!} sectionData={sectionData} />
        ) : (
          <EditCouseDetails courseDetails={courseDetails} />
        )}
      </div>
    </>
  );
}
