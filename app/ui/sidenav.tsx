import classes from "./sidenav.module.css";
import Link from "next/link";
import { signOut } from "@/auth";
import { fetchCategories } from "../lib/data";
import { auth } from "@/auth";

export default async function SideNav() {
  const categories = await fetchCategories();
  const session = await auth();
  let authenticated = false;
  if (session?.user?.email) {
    authenticated = true;
  }

  return (
    <div className={classes.sideBar}>
      <div className={classes.flexContainer}>
        <Link href="/" className={classes.link}>
          <div className={classes.item}>
            <p className={classes.category}>Home</p>
          </div>
        </Link>
        {categories?.map((category) => (
          <Link
            className={classes.link}
            href={`/category/${category.id}`}
            key={category.id}
          >
            <div className={classes.item}>
              <p className={classes.categoryName}>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.signOutContainer}>
        {authenticated && (
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
        )}
      </div>
    </div>
  );
}
