"use client";

export default function BlockTypeSelector({
  blockType,
  blockIndex,
  handleTypeChange,
}: {
  blockType: string;
  blockIndex: number;
  handleTypeChange: (
    e: React.FormEvent<HTMLSelectElement>,
    blockIndex: number
  ) => void;
}) {
  return (
    <div className="ml-40">
      <select
        name="blockTypeSelector"
        className="bg-p-3 text-s-3 px-4 py-2 rounded-lg"
        value={blockType}
        onChange={(e) => handleTypeChange(e, blockIndex)}
      >
        <option value="text">Text</option>
        <option value="subtitle">Subtitle</option>
        <option value="video">Video</option>
        <option value="image">Image</option>
      </select>
    </div>
  );
}
