import FourallLogo from "./4all-logo";
import classes from "./header.module.css";

export default function Header() {
  return (
    <>
      <div className={classes.logo}>
        <FourallLogo />
      </div>
      <div className={classes.searchBar}></div>
    </>
  );
}
