import { FaTrashAlt } from "react-icons/fa";

export function BlockDelete({
  blockId,
  handleBlockDelete,
}: {
  blockId: string;
  handleBlockDelete: (blockId: string) => void;
}) {
  return (
    <div className="ml-10">
      <button className="" onClick={() => handleBlockDelete(blockId)}>
        <FaTrashAlt className="text-s-3 text-xl" />
      </button>
    </div>
  );
}
