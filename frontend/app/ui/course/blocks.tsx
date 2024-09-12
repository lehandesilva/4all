import { block } from "@/app/server/definitions";
import Image from "next/image";

export default function Block({ block }: { block: block }) {
  if (block.type === "subtitle") {
    return (
      <h2 key={block.id} className="my-4 text-s-3 text-xl font-bold">
        {block.content}
      </h2>
    );
  } else if (block.type === "text") {
    return (
      <p key={block.id} className="text-s-4 text-base my-3">
        {block.content}
      </p>
    );
  } else if (block.type === "image") {
    return (
      <Image
        src={block.content}
        alt={`Image ${block.id}`}
        width={1280}
        height={720}
        className="my-10 self-center"
        key={block.id}
      />
    );
  } else if (block.type === "video") {
    return (
      <video
        key={block.id}
        src={block.content}
        className="my-10 self-center"
        width="1280"
        height="720"
        controls
        preload="none"
      />
    );
  }
}
