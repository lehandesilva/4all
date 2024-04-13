"use client";
import { block } from "@/app/lib/definitions";
import { useRef, useState } from "react";
import styles from "./editor.module.css";
import { Content } from "next/font/google";
export default function Editor() {
  const [blocks, setBlocks] = useState<
    { id: number; type: string; content: string; size: string }[]
  >([
    { id: 0, type: "title", content: "Add title here", size: "3" },
    { id: 1, type: "text", content: "Add text here", size: "1" },
  ]);
  const [selectedBlock, setSelectedBlock] = useState<number>(0);
  const [blockCounter, setBlockCounter] = useState<number>(2);

  const dragBlock = useRef<number>(0);
  const draggedOverBlock = useRef<number>(0);

  const handleSort = () => {
    const blocksClone = [...blocks];
    const temp = blocksClone[dragBlock.current];
    blocksClone[dragBlock.current] = blocksClone[draggedOverBlock.current];
    blocksClone[draggedOverBlock.current] = temp;
    setBlocks(blocksClone);
  };

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newContent = event.target.value;
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = newContent;
    setBlocks(updatedBlocks);
  };

  const handleTitleClick = () => {
    setBlocks([
      ...blocks,
      { id: blockCounter, type: "title", content: "", size: "3" },
    ]);
    let temp = blockCounter;
    temp++;
    setBlockCounter(temp);
  };

  const handleTextClick = () => {
    setBlocks([
      ...blocks,
      { id: blockCounter, type: "text", content: "", size: "1" },
    ]);
    let temp = blockCounter;
    temp++;
    setBlockCounter(temp);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    const updatedBlocks = [...blocks];
    updatedBlocks[selectedBlock].size = newContent;
    setBlocks(updatedBlocks);
  };

  const changeSelectedBlock = (blockId: number) => {
    setSelectedBlock(blockId);
  };

  const handleRemoveClick = () => {
    if (blocks.length > 1) {
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(selectedBlock, 1); // Remove the selected block
      setSelectedBlock(selectedBlock > 0 ? selectedBlock - 1 : 0); // Update selected block (if needed)
      setBlocks(updatedBlocks);
    }
  };

  return (
    <>
      <div className={styles.editingSection}>
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={styles.block}
            draggable
            onDragStart={() => {
              dragBlock.current = index;
            }}
            onDragEnter={() => {
              draggedOverBlock.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={block.content}
              onChange={(event) => changeHandler(event, index)}
              onFocus={() => changeSelectedBlock(block.id)}
            />
          </div>
        ))}
      </div>
      <div className={styles.sizeContainer}>
        <input
          type="number"
          value={blocks[selectedBlock].size}
          onChange={(event) => handleSizeChange(event)}
        />
      </div>
      <div className={styles.buttons}>
        <button className={styles.titleBtn} onClick={handleTitleClick}>
          Add Title
        </button>
        <button className={styles.textBtn} onClick={handleTextClick}>
          Add text
        </button>
        <button className={styles.removeBtn} onClick={handleRemoveClick}>
          Remove
        </button>
      </div>
    </>
  );
}
// block should be an object with type, content and size
// Two buttons to add text and title
