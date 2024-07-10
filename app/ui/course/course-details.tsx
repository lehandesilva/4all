import { Course } from "@/app/server/definitions";
import styles from "./course-details.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CourseDetails({ course }: { course: Course }) {
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
      {course.img_url && (
        <Image
          src={course.img_url}
          width={640}
          height={360}
          alt="Course Image"
        />
      )}
      <div className={styles.course__sections}>
        {course.sections?.map((section, index) => (
          <Link
            href={`/course/${course.id}/${section.id}`}
            key={section.id}
            className={styles.link}
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
