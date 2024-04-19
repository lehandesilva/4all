import FourallLogo from "./4all-logo";
import classes from "./header.module.css";
import SearchBox from "./searchBox";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  let authenticated = false;
  if (session?.user?.email) {
    authenticated = true;
  }

  return (
    <>
      <div className={classes.container}>
        <FourallLogo />
        <div className={classes.searchBar}>
          <SearchBox />
        </div>
        <Link href={authenticated ? "/profile" : "/login"}>
          <button className={classes.ProfileBtn}>
            {authenticated ? session?.user?.name : "Login"}
          </button>
        </Link>
      </div>
    </>
  );
}
