"use client";

import classes from "./editor-test.module.css";
import { useState } from "react";
import { createSection } from "@/app/server/actions";
export default function EditorTest() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createSection(new FormData(e.target as HTMLFormElement));
  };
  return (
    <>
      <p>Editor</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="text" name="content" />
        <button className={classes.saveBtn}>Save</button>
      </form>
    </>
  );
}
