"use client";
import styles from "./signup-form.module.css";
import { createNewUser } from "../server/actions";
import { useState } from "react";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createNewUser(new FormData(event.currentTarget));
      if (response?.error) {
        setErrorMessage(response.message);
        return;
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <>
      <div className={styles.SignUp}>
        <h1 className={styles.signInTitle}>Sign Up</h1>
        <form action={createNewUser} onSubmit={handleSubmit}>
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
            <label className={styles.labels} htmlFor="age">
              Age
            </label>
            <input
              className={styles.signUpInput}
              type="number"
              name="age"
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
        <div className={styles.errorMessages}>
          {<p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
    </>
  );
}
