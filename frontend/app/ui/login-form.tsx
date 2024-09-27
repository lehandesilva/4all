"use client";

// import styles from "./login-form.module.css";
import Link from "next/link";
import { authenticate } from "../server/actions";
import { MdError } from "react-icons/md";
import { useState } from "react";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await authenticate(new FormData(event.currentTarget));
      if (response?.error) {
        setErrorMessage(response.message);
        return;
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl text-s-3 font-light mt-20 ml-72 mb-5">Login</h1>
        {errorMessage && (
          <div className="w-full bg-p-3 flex p-1 items-center justify-center">
            <MdError className=" mx-2 text-s-1" />
            <p className="text-s-3 text-lg">{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col mt-8 items-center">
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-14"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-10"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="mt-8">
            <Link href="/signUp">
              <button className="px-4 py-2 border-2 border-s-2 rounded-full text-s-2 hover:bg-s-2 hover:text-s-3">
                Dont have an account?
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-s-1 rounded-full text-s-3 mb-10 ml-10"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
