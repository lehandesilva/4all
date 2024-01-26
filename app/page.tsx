import classes from "./page.module.css";
import Header from "./ui/header";
import { fetchCourse } from "@/app/lib/data";

export default async function Home() {
  return (
    <main>
      <Header />
    </main>
  );
}
