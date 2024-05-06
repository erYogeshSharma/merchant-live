"use client";

import { FormEvent, useState } from "react";
import OAuth from "./o-auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [isSignUp, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  async function credentialsSignin(email: string, password: string) {
    const signInResponse = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/meetings/1234");
    } else {
      setError("Invalid Credentails");
    }
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //direct signin
    if (!isSignUp) {
      credentialsSignin(
        data.get("email") as string,
        data.get("password") as string
      );
      return;
    }
    //signup
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      setError(response.message);
      return;
    } else {
      credentialsSignin(
        data.get("email") as string,
        data.get("password") as string
      );
      return;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {isSignUp && (
            <div className="grid gap-2">
              <label htmlFor="last-name">Name</label>
              <input
                id="last-name"
                name="name"
                placeholder="Robinson"
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" />
          </div>
          <button type="submit" className="w-full">
            {isSignUp ? "Create an account" : "Sign in"}
          </button>
          <div className="text-red-800 text-xs">{error}</div>
        </div>
      </form>

      <div className="mt-2"></div>
      <div className="mt-4 text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        &nbsp;
        {/* <link
          onClick={() => setIsSignup((ps) => !ps)}
          href="#"
          className="underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </link> */}
      </div>
    </div>
  );
}
