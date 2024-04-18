"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="">
        <h1 className="">Please log in to continue.</h1>
        <div className="">
          <div>
            <label className="" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className=""
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="">
            <label className="" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className=""
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p className="">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="" aria-disabled={pending}>
      Log in
    </button>
  );
}
