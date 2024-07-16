"use client";
import { section } from "@/app/server/definitions";
import EditorTest from "./editor-test";
import { useState } from "react";
import { Course } from "@/app/server/definitions";

// This page should have a side panel with all the sections that are available and an additional
// button to add a new section. Import the course details and map the sections to the section edit
// component. The add new section button would also be on the section edit component. Section edit
// will get two props, the id and name. If id and name is null then its a new section.

// each section will contain a id, name, blocks<Array>
// each block will contain type, content and style
// page needs the course sections from postgres to import the sections from mongodb

export default function SectionEdit({
  courseDetails,
}: {
  courseDetails: Course;
}) {
  const [sections, setSections] = useState();
  const handleAddSection = () => {
    // add
  };
  return (
    <>
      <div className="flex">
        <div className="w-96 h-dvh px-4 py-2 border-r-4 flex flex-col justify-between">
          <div>
            <div className="ml-8">
              <input
                type="text"
                defaultValue={courseDetails.name || "Untitled"}
                className="border-b-2 border-gray-300 p-2 focus:outline-none text-xl"
              />
            </div>
            <h3 className="mt-4 p-3 font-semibold text-lg">Sections</h3>
            {courseDetails.sections?.map((section) => (
              <div
                className="pl-6 py-1 m-1 border-[1px] rounded"
                key={section.id}
              >
                <h3>{section.name}</h3>
              </div>
            ))}
            <button
              className="mt-6 border-2 rounded px-4 py-1 text-indigo-800 font-medium border-indigo-500"
              onClick={handleAddSection}
            >
              Add New Section
            </button>
          </div>
          <div>
            <button>Edit Course Details</button>
          </div>
        </div>

        <div>
          <EditorTest courseId={courseDetails.id!} />
        </div>
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
