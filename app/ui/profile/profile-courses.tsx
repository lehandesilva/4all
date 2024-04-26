import styles from "./profile-courses.module.css";
import Link from "next/link";
import ProfileCourse from "./profile-course";
import DeleteCourseBtn from "./delete-course-btn";

export interface UserCoursesProps {
  id: string;
  name: string;
  rating: number;
  img_url: string; // Array of course objects
}

export default function ProfileCourses({
  userCourses,
}: {
  userCourses: UserCoursesProps[];
}) {
  return (
    <>
      {userCourses.map((course: UserCoursesProps) => (
        <div className={styles.course} key={course.id}>
          <Link href={`/course/${course.id}`} className={styles.courseLink}>
            <ProfileCourse course={course} />
          </Link>
          <DeleteCourseBtn courseId={course.id} />
        </div>
      ))}
    </>
  );
}
