"use client";

import styles from "./signup-form.module.css";
import { signUpUser } from "../lib/actions";

export default function SignUp() {
  return (
    <>
      <div className={styles.SignUp}>
        <h1 className={styles.signInTitle}>Sign Up</h1>
        <form action={signUpUser}>
          <div className={styles.signUpSection}>
            <label className={styles.labels} htmlFor="name">
              Name
            </label>
            <input
              className={styles.signUpInput}
              type="text"
              name="name"
              required
            />
            <label className={styles.labels} htmlFor="email">
              Email
            </label>
            <input
              className={styles.signUpInput}
              type="text"
              name="email"
              required
            />
            <label className={styles.labels} htmlFor="password">
              Password
            </label>
            <input
              className={styles.signUpInput}
              type="password"
              name="password"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
