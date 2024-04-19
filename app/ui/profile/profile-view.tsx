import styles from "./profile-view.module.css";
import Image from "next/image";

export default function Profile({ user }: { user: any }) {
  return (
    <div className={styles.container}>
      <h1>{user.name}</h1>
      <p>{`Email: ${user.email}`}</p>
      <p>{`Courses created by ${user.name}`}</p>
    </div>
  );
}
