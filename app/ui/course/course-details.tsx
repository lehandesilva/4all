import { Course, section } from "@/app/lib/definitions";
import styles from "./course-details.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CourseDetails({ course }: { course: Course }) {
  console.log(course.img_url || "ass");
  return (
    <div className={styles.course}>
      <h1 className={styles.course__title}>{course.name}</h1>
      <p className={styles.course__description}>{course.description}</p>
      <div className={styles.course__info}>
        <p className={styles.course__instructor}>
          Instructor: {course.instructor_name}
        </p>
        <p className={styles.course__rating}>Rating: {course.rating}</p>
      </div>
      <Image
        src={course.img_url}
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <div className={styles.course__sections}>
        {course.sections?.map((section, index) => (
          <Link
            href={`/course/${course.id}/${section.course_material_id}`}
            key={section.id}
          >
            <div className={styles.section}>
              <h3 className={styles.section__title}>{`Section ${index + 1}: ${
                section.name
              }`}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
