"use client";

import { useState } from "react";
import styles from "./create-sections.module.css";
import Editor from "../editor/editor";
import { createSections } from "@/app/lib/actions";

interface Section {
  id: number;
  name: string;
  content?: { id: number; type: string; content: string; size: string }[]; // Array of block objects
}
export default function CreateSections({ courseId }: { courseId: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const handleUpdateSectionContent = (
    sectionId: number,
    newBlocks: { id: number; type: string; content: string; size: string }[]
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionId].content = newBlocks;
    setSections(updatedSections);
  };

  const handleSaveSection = () => {
    const updatedSections = [
      ...sections,
      {
        id: sections.length,
        name: sectionName,
        content: [],
      },
    ];
    setSections(updatedSections);
    console.log(updatedSections);
    setSectionName("");
    setShowInput(false); // Hide the input field after saving
  };

  const handleAddSection = () => {
    setShowInput(true); // Show the input field
  };

  const handleCancelAddSection = () => {
    setShowInput(false); // Hide the input field on cancel
  };

  const handleSectionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSectionName(event.target.value);
  };

  const handleRemoveSection = (sectionId: number) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );
    setSections(updatedSections);
  };

  const handleSaveChanges = () => {
    const sectionsJson = JSON.stringify(sections);
    const hiddenInput = document.getElementById("hiddenSections"); // Access hidden input
    if (hiddenInput && hiddenInput instanceof HTMLInputElement) {
      hiddenInput.value = sectionsJson;
    }
  };

  return (
    <>
      <div className={styles.sectionEditor}>
        {sections?.map((section, index) => (
          <div key={index} className={styles.section}>
            <h2 className={styles.sectionName}>{section.name}</h2>
            <Editor
              sectionId={section.id}
              content={section.content}
              onUpdateContent={handleUpdateSectionContent}
            />
            <button
              className={styles.removeSectionBtn}
              onClick={() => handleRemoveSection(section.id)}
            >
              Remove Section
            </button>
          </div>
        ))}
        {showInput && (
          <div>
            <input
              type="text"
              placeholder="Enter Section Name"
              onChange={handleSectionNameChange}
              className={styles.sectionNameInput}
            />
            <button
              className={styles.saveSection}
              disabled={sectionName.length === 0}
              onClick={handleSaveSection}
            >
              Add Section
            </button>
            <button
              className={styles.cancelSection}
              onClick={handleCancelAddSection}
            >
              Cancel
            </button>
          </div>
        )}

        <button
          className={styles.addSection}
          onClick={handleAddSection}
          disabled={showInput}
        >
          Add New Section
        </button>

        <form action={createSections}>
          <input type="hidden" name="courseId" value={courseId} />
          <input type="hidden" id="hiddenSections" name="sections" value="" />
          <button className={styles.saveAllBtn} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
