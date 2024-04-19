import Link from "next/link";

export default function NotFound() {
  return (
    <main className="">
      <h2 className="">404 Not Found</h2>
      <p>Could not find the requested data.</p>
      <Link href="/" className="">
        Go to Homepage
      </Link>
    </main>
  );
}
