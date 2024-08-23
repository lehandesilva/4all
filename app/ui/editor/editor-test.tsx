"use client";
import { block, section_for_section } from "@/app/server/definitions";
import React, { useEffect, useRef, useState } from "react";
import { createSection, geteSignedUrl } from "@/app/server/actions";
import Block from "./block";
import { createId } from "@/app/lib/util";
import { block_for_editor } from "@/app/server/definitions";

const initialBlocksRender = (blocks: block[]) => {
  const tempBlocks: block_for_editor[] = [];
  blocks?.forEach((block) => {
    const tempBlock = {
      id: block.id,
      type: block.type,
      content: block.content,
      style: block.style,
      file: null,
    };
    tempBlocks.push(tempBlock);
  });
  return tempBlocks;
};

export default function EditorTest({
  courseId,
  sectionData,
}: {
  courseId: string;
  sectionData: section_for_section;
}) {
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  // Error Handling
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // add the submit logic and complete the editor
  const [blocks, setBlocks] = useState<block_for_editor[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  useEffect(() => {
    const initialBlocks = initialBlocksRender(sectionData.blocks || []);
    setBlocks(initialBlocks);
  }, [sectionData]);

  const [sectionName, setSectionName] = useState<string>(
    sectionData.name || "Üntitled Section"
  );
  const handlesectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value);
  };

  const handleBlockDelete = (blockId: string) => {
    const updatedBlocks = blocks.filter((block) => block.id !== blockId);
    setBlocks(updatedBlocks);
    setSelectedBlock(null);
  };

  const handleChangeMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    blockId: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedBlocks = blocks.map((block) => {
        if (block.id === blockId) {
          block.content = url;
          block.file = file;
        }
        return block;
      });
      setBlocks(updatedBlocks);
    }
  };
  const handleBlockSelect = (index: number) => {
    setSelectedBlock(index);
  };

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    blockId: string
  ) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        block.content = e.target.value;
      }
      return block;
    });
    setBlocks(updatedBlocks);
  };

  const handleSubmit = async () => {
    const blocks_toSend: block[] = [];
    blocks.forEach(async (block) => {
      if (block.file !== null) {
        console.log("uploading");
        const sha256 = await computeSHA256(block.file);
        const signedUrl = await geteSignedUrl(
          block.file.type,
          block.file.size,
          sha256
        );
        if (signedUrl.failure !== undefined) {
          setErrorMessage(signedUrl.failure);
        }
        const url = signedUrl.success?.url;
        if (url) {
          await fetch(url, {
            method: "PUT",
            body: block.file,
            headers: {
              "Content-Type": block.file?.type,
            },
          });
          block.content = url.split("?")[0];
        }
      }
      const tempBlock: block = {
        id: block.id,
        type: block.type,
        content: block.content,
        style: block.style,
      };
      blocks_toSend.push(tempBlock);
    });

    // Then server action to upload section to the server
    const result = await createSection(
      courseId,
      blocks_toSend,
      sectionData.id,
      sectionName
    );
    if (result.error) {
      setErrorMessage(result.message);
    }
  };

  const handleAddBlock = () => {
    if (blocks.length > 20) {
      alert("Maximum number of blocks reached");
      return;
    }
    const newBlock: block_for_editor = {
      id: createId(),
      type: "text",
      content: "",
      style: {
        color: "black",
        size: 2,
        align: "center",
      },
      file: null,
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
  };

  const handleBlockTypeChange = (
    e: React.FormEvent<HTMLSelectElement>,
    blockIndex: number
  ) => {
    e.preventDefault();
    const updatedBlocks = [...blocks];
    const blockType = (e.target as HTMLSelectElement).value;
    updatedBlocks[blockIndex].type = blockType;
    setBlocks(updatedBlocks);
  };

  return (
    <div className="flex-col">
      {errorMessage && (
        <div className="w-full bg-p-3 h-10 flex items-center justify-center">
          <p className="text-s-3 text-lg">{errorMessage}</p>
        </div>
      )}
      <div className="p-5 w-full">
        <input
          type="text"
          defaultValue={sectionName}
          onChange={handlesectionNameChange}
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
            handleChangeMedia={handleChangeMedia}
            handleBlockDelete={handleBlockDelete}
            handleChangeText={handleChangeText}
          />
        ))}
        <div className="flex flex-col">
          <button
            className="self-center px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3 w-36 mb-12"
            onClick={handleAddBlock}
          >
            Add Block
          </button>
          <button
            className="self-end px-4 py-2 bg-s-1 rounded-full text-s-3"
            onClick={handleSubmit}
          >
            Save Section
          </button>
        </div>
      </div>
    </div>
  );
}
