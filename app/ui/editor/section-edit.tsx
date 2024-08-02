import EditorTest from "./editor-test";
import {
  Course,
  newSection,
  section_for_section,
} from "@/app/server/definitions";
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
  sectionData: section_for_section | newSection | null;
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

//   const [sections, setSections] = useState<Section[]>([]);
//   const [showInput, setShowInput] = useState(false);
//   const [sectionName, setSectionName] = useState("");

//   const handleUpdateSectionContent = (
//     sectionId: number,
//     newBlocks: { id: number; type: string; content: string; size: string }[]
//   ) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionId].content = newBlocks;
//     setSections(updatedSections);
//   };

//   const handleSaveSection = () => {
//     const updatedSections = [
//       ...sections,
//       {
//         id: sections.length,
//         name: sectionName,
//         content: [],
//       },
//     ];
//     setSections(updatedSections);
//     console.log(updatedSections);
//     setSectionName("");
//     setShowInput(false); // Hide the input field after saving
//   };

//   const handleAddSection = () => {
//     setShowInput(true); // Show the input field
//   };

//   const handleCancelAddSection = () => {
//     setShowInput(false); // Hide the input field on cancel
//   };

//   const handleSectionNameChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSectionName(event.target.value);
//   };

//   const handleRemoveSection = (sectionId: number) => {
//     const updatedSections = sections.filter(
//       (section) => section.id !== sectionId
//     );
//     setSections(updatedSections);
//   };

//   const handleSaveChanges = () => {
//     const sectionsJson = JSON.stringify(sections);
//     const hiddenInput = document.getElementById("hiddenSections"); // Access hidden input
//     if (hiddenInput && hiddenInput instanceof HTMLInputElement) {
//       hiddenInput.value = sectionsJson;
//     }
//   };

//   return (
//     <>
//       <div className={styles.sectionEditor}>
//         {sections?.map((section, index) => (
//           <div key={index} className={styles.section}>
//             <h2 className={styles.sectionName}>{section.name}</h2>
//             <Editor
//               sectionId={section.id}
//               content={section.content}
//               onUpdateContent={handleUpdateSectionContent}
//             />
//             <button
//               className={styles.removeSectionBtn}
//               onClick={() => handleRemoveSection(section.id)}
//             >
//               Remove Section
//             </button>
//           </div>
//         ))}
//         {showInput && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter Section Name"
//               onChange={handleSectionNameChange}
//               className={styles.sectionNameInput}
//             />
//             <button
//               className={styles.saveSection}
//               disabled={sectionName.length === 0}
//               onClick={handleSaveSection}
//             >
//               Add Section
//             </button>
//             <button
//               className={styles.cancelSection}
//               onClick={handleCancelAddSection}
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         <button
//           className={styles.addSection}
//           onClick={handleAddSection}
//           disabled={showInput}
//         >
//           Add New Section
//         </button>

//         <form action={createSections}>
//           <input type="hidden" name="courseId" value={courseId} />
//           <input type="hidden" id="hiddenSections" name="sections" value="" />
//           <button className={styles.saveAllBtn} onClick={handleSaveChanges}>
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
