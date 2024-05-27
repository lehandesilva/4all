"use client";

import styles from "./login-form.module.css";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../server/actions";

export default function LoginForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await authenticate(new FormData(event.currentTarget));
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.loginTitle}>Login</h1>
        <div className={styles.loginSection}>
          <label className={styles.labels} htmlFor="email">
            Email
          </label>
          <input
            className={styles.loginInput}
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
          <label className={styles.labels} htmlFor="password">
            Password
          </label>
          <input
            className={styles.loginInput}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button className={styles.loginButton}>Log in</button>
        {/* <div
          className={styles.errorDisplaySection}
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className={styles.error}>{errorMessage}</p>
            </>
          )}
        </div> */}
      </form>
      <div className={styles.signupContainer}>
        <Link href="/signUp">
          <button className={styles.signupBtn}>Dont have an account?</button>
        </Link>
      </div>
    </div>
  );
}
