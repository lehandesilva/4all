"use client";
import { createNewUser } from "../server/actions";
import { useState } from "react";
import { MdError } from "react-icons/md";

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
      <h1 className="text-5xl text-s-3 font-light mt-20 ml-72 mb-5">Sign Up</h1>
      {errorMessage && (
        <div className="w-full bg-p-3 flex p-1 items-center justify-center">
          <MdError className=" mx-2 text-s-1" />
          <p className="text-s-3 text-lg">{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-8 items-center">
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-8"
            type="text"
            name="name"
            required
            placeholder="Name"
          />
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-8"
            type="text"
            name="email"
            required
            placeholder="Email"
          />
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-8"
            type="number"
            name="age"
            required
            placeholder="Age"
          />
          <input
            className="px-4 py-2 bg-p-3 focus:bg-s-6 outline-none rounded-2xl text-s-3 w-80 mb-8"
            type="password"
            name="password"
            required
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-s-1 rounded-full text-s-3 mb-10 ml-10"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
