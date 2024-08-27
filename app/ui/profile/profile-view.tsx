import styles from "./profile-view.module.css";
import Image from "next/image";
import { signOut } from "@/auth";

export default function Profile({ user }: { user: any }) {
  return (
    <div className={styles.container}>
      <h1>{user.name}</h1>
      <p>{`Email: ${user.email}`}</p>
      <p>{`Courses created by ${user.name}`}</p>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="">
          <div className="">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
