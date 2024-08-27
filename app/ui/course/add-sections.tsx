import Link from "next/link";
export default function AddSections({ courseId }: { courseId: string }) {
  return (
    <>
      <Link href={`${courseId}/edit`}>
        <button className="">Add Section</button>
      </Link>
    </>
  );
}
