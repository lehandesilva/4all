"use client";

import styles from "./login-form.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { auth } from "@/auth";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={styles.loginForm}>
      <form action={dispatch}>
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
            minLength={6}
          />
        </div>

        <LoginButton />
        <div
          className={styles.errorDisplaySection}
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className={styles.error}>{errorMessage}</p>
            </>
          )}
        </div>
        <div className={styles.signupContainer}>
          <Link href="/signUp">
            <button className={styles.signupBtn}>Dont have an account?</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.loginButton} disabled={pending}>
      Log in
    </button>
  );
}
