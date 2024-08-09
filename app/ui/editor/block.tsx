"use client";

import { block } from "@/app/server/definitions";
import { MdOutlineDragIndicator } from "react-icons/md";
import BlockTypeSelector from "./blockTypeSelector";
import { useState } from "react";

export default function Block({
  block,
  blockIndex,
  handleTypeChange,
  selectedBlock,
  handleBlockSelection,
}: {
  block: block;
  blockIndex: number;
  handleTypeChange: (
    e: React.FormEvent<HTMLSelectElement>,
    blockIndex: number
  ) => void;
  selectedBlock: boolean; // Add a prop to highlight the selected block when true
  handleBlockSelection: (blockIndex: number) => void;
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

  if (block.type === "text") {
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>
          <textarea
            defaultValue={block.content}
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[80rem]"
            onFocus={() => handleBlockSelection(blockIndex)}
          />
        </div>
        {selectedBlock && (
          <BlockTypeSelector
            blockType={block.type}
            blockIndex={blockIndex}
            handleTypeChange={handleTypeChange}
          />
        )}
      </div>
    );
  } else if (block.type === "subtitle") {
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>
          <input
            type="text"
            defaultValue={block.content}
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 text-xl"
            onFocus={() => handleBlockSelection(blockIndex)}
          />
        </div>
        {selectedBlock && (
          <BlockTypeSelector
            blockType={block.type}
            blockIndex={blockIndex}
            handleTypeChange={handleTypeChange}
          />
        )}
      </div>
    );
  } else if (block.type === "video") {
    };
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>
          <input
            type="file"
            name="media"
            accept="video/mp4, video/webm"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
            onFocus={() => handleBlockSelection(blockIndex)}
            onChange={handleChangeVideo}
          />
          {fileUrl ? (
            <video
              width="640"
              height="360"
              controls
              preload="none"
              src={fileUrl}
            ></video>
          ) : (
            <div className="w-[640px] h-[360px] bg-p-3 rounded-2xl border-dashed border-2 border-[#77848d]">
              <label
                htmlFor="media"
                className="hover:cursor-pointer text-[#77848d] w-full h-full flex justify-center items-center"
              >
                Upload Video
              </label>
            </div>
          )}
        </div>
        {selectedBlock && (
          <BlockTypeSelector
            blockType={block.type}
            blockIndex={blockIndex}
            handleTypeChange={handleTypeChange}
          />
        )}
      </div>
    );
  } else if (block.type === "image") {
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>
          <input
            type="file"
            id="media"
            name="media"
            accept="image/jpeg,image/png, image/gif"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
            onFocus={() => handleBlockSelection(blockIndex)}
            // onChange={}
          />
        </div>
        {selectedBlock && (
          <BlockTypeSelector
            blockType={block.type}
            blockIndex={blockIndex}
            handleTypeChange={handleTypeChange}
          />
        )}
      </div>
    );
  }
}
