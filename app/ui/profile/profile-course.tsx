import styles from "./profile-course.module.css";
import Image from "next/image";

export default function ProfileCourse({
  course,
}: {
  course: { id: string; name: string; rating: number; img_url: string };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.course} key={course.id}>
        <div className={styles.courseImage}>
          <Image
            src={course.img_url}
            width={200}
            height={100}
            alt={course.name}
          />
        </div>
        <div className={styles.courseDetails}>
          <h2>{course.name}</h2>
          <p>Rating: {course.rating}</p>
        </div>
      </div>
    </div>
  );
}
