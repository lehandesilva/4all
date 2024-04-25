"use client";

import styles from "./signup-form.module.css";
import { signUpUser } from "../lib/actions";
import { useFormState } from "react-dom";

export default function SignUp() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(signUpUser, initialState);

  return (
    <>
      <div className={styles.SignUp}>
        <h1 className={styles.signInTitle}>Sign Up</h1>
        <form action={dispatch}>
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
              aria-describedby="email-error"
            />
            <div id="email-error" className={styles.errorDisplaySection}>
              {state.errors?.email &&
                state.errors?.email.map((error: string) => (
                  <p className={styles.error} key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <label className={styles.labels} htmlFor="password">
              Password
            </label>
            <input
              className={styles.signUpInput}
              type="password"
              name="password"
              required
              aria-describedby="password-error"
            />
            <div id="password-error" className={styles.errorDisplaySection}>
              {state.errors?.password &&
                state.errors?.password.map((error: string) => (
                  <p className={styles.error} key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
