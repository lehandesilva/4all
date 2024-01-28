import classes from "./sidenav.module.css";
import FourallLogo from "./4all-logo";
import Link from "next/link";
import { categories } from "@/app/lib/placeholder-data";

export default function SideNav() {
  return (
    <>
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
    </>
  );
}
