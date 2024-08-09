"use client";
import {
  block,
  newSection,
  section_for_section,
} from "@/app/server/definitions";
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
  let intialVideoBlock: boolean = false;
  sectionData.blocks?.forEach((block) => {
    if (block.type === "video") {
      intialVideoBlock = true;
    }
  });
  const [videoBlock, setVideoBlock] = useState<boolean>(intialVideoBlock);
  const [blocks, setBlocks] = useState(sectionData.blocks || []);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  const handleBlockSelect = (index: number) => {
    setSelectedBlock(index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sectionData);
    // await createSection(courseId, new FormData(e.target as HTMLFormElement));
  };

  const handleAddBlock = () => {
    if (blocks.length > 20) {
      alert("Maximum number of blocks reached");
      return;
    }
    const newBlock: block = {
      type: "text",
      content: "",
      style: {
        color: "black",
        size: 2,
        align: "center",
      },
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
  };

  const handleChangeVideo = () => {};

  const handleBlockTypeChange = (
    e: React.FormEvent<HTMLSelectElement>,
    blockIndex: number
  ) => {
    e.preventDefault();
    const updatedBlocks = [...blocks];
    const blockType = (e.target as HTMLSelectElement).value;
    if (blockType === "video") {
      if (!videoBlock) {
        setVideoBlock(true);
        updatedBlocks[blockIndex].type = blockType;
        setBlocks(updatedBlocks);
      } else {
        alert("Cannot add two video blocks to a section");
        return;
      }
    } else {
      updatedBlocks[blockIndex].type = blockType;
      setBlocks(updatedBlocks);
    }
  };
  return (
    <div className="m-12 w-full">
      <input
        type="text"
        defaultValue={sectionData.name}
        className="px-4 py-2 border-b-2 focus:bg-s-6 outline-none bg-transparent text-s-3 text-2xl mb-8"
      />
      {blocks.map((block, index) => (
        <Block
          key={index}
          block={block}
          blockIndex={index}
          handleTypeChange={handleBlockTypeChange}
          selectedBlock={selectedBlock === index ? true : false}
          handleBlockSelection={handleBlockSelect}
        />
      ))}
      <div className="flex flex-col">
        <button
          className="self-center px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3 w-36 mb-12"
          onClick={handleAddBlock}
        >
          Add Block
        </button>
        <button className="self-end px-4 py-2 bg-s-1 rounded-full text-s-3">
          Save Section
        </button>
      </div>
    </div>
  );
}
