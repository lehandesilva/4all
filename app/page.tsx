import classes from "./page.module.css";
import Header from "./ui/header";
import { fetchCourse } from "@/app/lib/data";

export default async function Home() {
  const courses = await fetchCourse();
  console.log(courses[0].blocks[0].content);
  return (
    <main>
      <Header />
    </main>
  );
}
