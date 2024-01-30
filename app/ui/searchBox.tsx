"use client";
import React, { useState } from "react";
import classes from "./searchBox.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
//import useDeboucedCallback from 'use-debounce';

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }
    replace(`${pathname}search?${params.toString()}`);
  };

  return (
    <div className={classes.searchBox}>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          className={classes.search}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </form>
    </div>
  );
}
