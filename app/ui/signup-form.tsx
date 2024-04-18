"use client";

import styles from "./signup-form.module.css";
import { signUpUser } from "../lib/actions";

export default function SignUp() {
  return (
    <>
      <h1>Sign Up</h1>
      <form action={signUpUser}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" required />
        <button type="submit" className={styles.submitBtn}>
          Sign Up
        </button>
      </form>
    </>
  );
}
