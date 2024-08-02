"use client";
import { newSection, section_for_section } from "@/app/server/definitions";
import { useState } from "react";
import { createSection } from "@/app/server/actions";
import Block from "./block";
export default function EditorTest({
  courseId,
  sectionData,
}: {
  courseId: string;
  sectionData: section_for_section | newSection;
}) {
  const [sections, setSections] = useState(sectionData.blocks || []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sectionData);
    // await createSection(courseId, new FormData(e.target as HTMLFormElement));
  };
  return (
    <div className="m-12">
      <input
        type="text"
        defaultValue={sectionData.name}
        className="px-4 py-2 border-b-2 focus:bg-s-6 outline-none bg-transparent text-s-3 text-2xl mb-8"
      />
      {sections.map((block) => (
        <Block block={block} />
      ))}
      <button className="">Save Section</button>
    </div>
  );
}
// import { useState } from "react";

// export default function EditorTest({
//   courseId,
//   sectionData,
// }: {
//   courseId: string;
//   sectionData: section_for_section | newSection;
// }) {
//   const [sectionName, setSectionName] = useState(sectionData.name);
//   const [blocks, setBlocks] = useState(sectionData.blocks || []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log({ sectionName, blocks });
//     // await createSection(courseId, { sectionName, blocks });
//   };

//   const handleInputChange = (index: number, newValue: string) => {
//     const updatedBlocks = [...blocks];
//     updatedBlocks[index] = newValue;
//     setBlocks(updatedBlocks);
//   };

//   return (
//     <div className="m-12">
//       <input
//         type="text"
//         value={sectionName}
//         onChange={(e) => setSectionName(e.target.value)}
//         className="px-4 py-2 border-b-2 focus:bg-s-6 outline-none bg-transparent text-s-3 text-2xl mb-8"
//       />
//       {blocks.map((block, index) => (
//         <Block
//           key={index}
//           block={block}
//           onChange={(newValue) => handleInputChange(index, newValue)}
//         />
//       ))}
//       <button className="" onClick={handleSubmit}>
//         Save Section
//       </button>
//     </div>
//   );
// }
