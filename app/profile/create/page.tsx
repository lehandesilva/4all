import CreateCourseForm from "@/app/ui/profile/create-course-form";
import { fetchCategories } from "@/app/lib/data";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <>
      <CreateCourseForm categories={categories} />
    </>
  );
}
