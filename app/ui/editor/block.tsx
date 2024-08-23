"use client";

import { block } from "@/app/server/definitions";
import { MdOutlineDragIndicator } from "react-icons/md";
import BlockTypeSelector from "./blockTypeSelector";
import Image from "next/image";
import { BlockDelete } from "./blockDelete";

export default function Block({
  block,
  blockIndex,
  handleTypeChange,
  handleChangeMedia,
  selectedBlock,
  handleBlockSelection,
  handleBlockDelete,
  handleChangeText,
}: {
  block: block;
  blockIndex: number;
  handleTypeChange: (
    e: React.FormEvent<HTMLSelectElement>,
    blockIndex: number
  ) => void;
  handleChangeMedia: (
    e: React.ChangeEvent<HTMLInputElement>,
    blockId: string
  ) => void;
  selectedBlock: boolean; // Add a prop to highlight the selected block when true
  handleBlockSelection: (blockIndex: number) => void;
  handleBlockDelete: (blockId: string) => void;
  handleChangeText: (
    e: React.ChangeEvent<HTMLInputElement>,
    blockId: string
  ) => void;
}) {
  if (block.type === "text") {
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>
          <input
            defaultValue={block.content}
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-[80rem]"
            onFocus={() => handleBlockSelection(blockIndex)}
            onChange={(e) => handleChangeText(e, block.id)}
          />
        </div>
        {selectedBlock && (
          <div className="flex items-center">
            <BlockTypeSelector
              blockType={block.type}
              blockIndex={blockIndex}
              handleTypeChange={handleTypeChange}
            />
            <BlockDelete
              blockId={block.id}
              handleBlockDelete={handleBlockDelete}
            />
          </div>
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
            onChange={(e) => handleChangeText(e, block.id)}
          />
        </div>
        {selectedBlock && (
          <div className="flex items-center">
            <BlockTypeSelector
              blockType={block.type}
              blockIndex={blockIndex}
              handleTypeChange={handleTypeChange}
            />
            <BlockDelete
              blockId={block.id}
              handleBlockDelete={handleBlockDelete}
            />
          </div>
        )}
      </div>
    );
  } else if (block.type === "video") {
    return (
      <div>
        <div className="flex items-center m-8" key={blockIndex}>
          <div className="w-12">
            <MdOutlineDragIndicator className="text-s-3 text-2xl" />
          </div>

          <input
            type="file"
            id={`${block.id}videoInput`}
            name={`${block.id}videoInput`}
            accept="video/mp4, video/webm, video/mkv"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
            onFocus={() => handleBlockSelection(blockIndex)}
            onChange={(e) => handleChangeMedia(e, block.id)}
          />

          {block.content ? (
            <video
              width="640"
              height="360"
              controls
              preload="none"
              src={block.content}
              onFocus={() => handleBlockSelection(blockIndex)}
            ></video>
          ) : (
            <div className="w-[640px] h-[360px] bg-p-3 rounded-2xl border-dashed border-2 border-[#77848d]">
              <label
                htmlFor={`${block.id}videoInput`}
                className="hover:cursor-pointer text-[#77848d] w-full h-full flex justify-center items-center"
              >
                Upload Video
              </label>
            </div>
          )}
        </div>
        {selectedBlock && (
          <div className="flex items-center">
            <BlockTypeSelector
              blockType={block.type}
              blockIndex={blockIndex}
              handleTypeChange={handleTypeChange}
            />
            <BlockDelete
              blockId={block.id}
              handleBlockDelete={handleBlockDelete}
            />
            {block.content && (
              <label
                htmlFor={`${block.id}videoInput`}
                className="ml-10 border-2 rounded-full px-2 py-1 text-s-2 font-medium border-s-2 cursor-pointer"
              >
                Change Video
              </label>
            )}
          </div>
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
            id={`${block.id}imageInput`}
            name={`${block.id}imageInput`}
            accept="image/jpeg,image/png, image/gif"
            className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
            onFocus={() => handleBlockSelection(blockIndex)}
            onChange={(e) => handleChangeMedia(e, block.id)}
          />
          {block.content ? (
            <Image
              alt={block.content || "LISTEN UP YOU NOSY BITCH LISTEN CLOSE"}
              width="640"
              height="360"
              src={block.content}
              onClick={() => handleBlockSelection(blockIndex)}
            />
          ) : (
            <div className="w-[640px] h-[360px] bg-p-3 rounded-2xl border-dashed border-2 border-[#77848d]">
              <label
                htmlFor={`${block.id}imageInput`}
                className="hover:cursor-pointer text-[#77848d] w-full h-full flex justify-center items-center"
              >
                Upload Image
              </label>
            </div>
          )}
        </div>
        {selectedBlock && (
          <div className="flex items-center">
            <BlockTypeSelector
              blockType={block.type}
              blockIndex={blockIndex}
              handleTypeChange={handleTypeChange}
            />
            <BlockDelete
              blockId={block.id}
              handleBlockDelete={handleBlockDelete}
            />
            {block.content && (
              <label
                htmlFor={`${block.id}imageInput`}
                className="ml-10 border-2 rounded-full px-2 py-1 text-s-2 font-medium border-s-2 cursor-pointer"
              >
                Change Image
              </label>
            )}
          </div>
        )}
      </div>
    );
  }
}
