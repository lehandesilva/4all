"use client";
import { useRef, useState } from "react";
import styles from "./editor.module.css";
interface EditorProps {
  sectionId: number;
  content?: { id: number; type: string; content: string; size: string }[]; // Array of block objects
  onUpdateContent: (
    sectionId: number,
    newBlocks: { id: number; type: string; content: string; size: string }[]
  ) => void;
}

export default function Editor({
  sectionId,
  content,
  onUpdateContent,
  ...props
}: EditorProps) {
  const [blocks, setBlocks] = useState<
    { id: number; type: string; content: string; size: string }[]
  >([
    { id: 0, type: "title", content: "Add title here", size: "3" },
    { id: 1, type: "text", content: "Add text here", size: "1" },
  ]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [blockCounter, setBlockCounter] = useState<number>(2);
  const [sizeofSelected, setSizeofSeleceted] = useState<string>("");

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
    onUpdateContent(sectionId, updatedBlocks);
  };

  const handleTitleClick = () => {
    const updatedBlocks = [
      ...blocks,
      { id: blockCounter, type: "title", content: "", size: "3" },
    ];
    setBlocks(updatedBlocks);
    onUpdateContent(sectionId, updatedBlocks);
    let temp = blockCounter;
    temp++;
    setBlockCounter(temp);
  };

  const handleTextClick = () => {
    const updatedBlocks = [
      ...blocks,
      { id: blockCounter, type: "text", content: "", size: "1" },
    ];
    setBlocks(updatedBlocks);
    onUpdateContent(sectionId, updatedBlocks);
    let temp = blockCounter;
    temp++;
    setBlockCounter(temp);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBlock !== null) {
      const newContent = event.target.value;
      const updatedBlocks = [...blocks];
      updatedBlocks[selectedBlock].size = newContent;
      setBlocks(updatedBlocks);
      setSizeofSeleceted(newContent); // Update sizeOfSelected here
      onUpdateContent(sectionId, updatedBlocks);
    }
  };

  const changeSelectedBlock = (blockId: number) => {
    setSelectedBlock(blockId);
    const block = blocks.find((block) => block.id === blockId);
    if (block) {
      setSizeofSeleceted(block.size);
    }
  };

  const handleRemoveClick = () => {
    if (selectedBlock !== null) {
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(selectedBlock, 1); // Remove the selected block
      setBlocks(updatedBlocks);
      setSelectedBlock(null);
      onUpdateContent(sectionId, updatedBlocks);
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
              className={styles.blockInput}
              value={block.content}
              onChange={(event) => changeHandler(event, index)}
              onFocus={() => {
                changeSelectedBlock(block.id);
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.sizeContainer}>
        <input
          type="number"
          value={sizeofSelected}
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
        <button
          className={styles.removeBtn}
          disabled={blocks.length > 1 ? false : true}
          onClick={handleRemoveClick}
        >
          Remove
        </button>
      </div>
    </>
  );
}
