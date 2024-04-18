import classes from "./sidenav.module.css";
import FourallLogo from "./4all-logo";
import Link from "next/link";
import { categories } from "@/app/lib/placeholder-data";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className={classes.sideBar}>
      <FourallLogo />
      <div className={classes.Navbar}>
        <h2 className={classes.title}>Categories</h2>
        <div className={classes.flexContainer}>
          {categories?.map((category) => (
            <div className={classes.category} key={category.id}>
              <p className={classes.categoryName}>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="">
          <div className="">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
