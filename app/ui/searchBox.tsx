"use client";

import classes from "./searchBox.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchHandler = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    if (pathname === "/search") {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}search?${params.toString()}`);
    }
  }, 2000);

  return (
    <div className={classes.searchBox}>
      <input
        type="text"
        className={classes.search}
        placeholder="Search Courses..."
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
