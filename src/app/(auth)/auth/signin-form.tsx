"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormEvent, useState } from "react";
import OAuth from "./o-auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import LogOut from "./logout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [isSignUp, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignUp) {
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
      } else {
        router.refresh();
        router.push("/");
      }
    }

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/meetings/1234");
    } else {
      console.log("Error", signInResponse);
      setError(signInResponse?.error || "Error while signing in");
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {isSignUp ? "Sign Up" : "Sign In"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>{error}</div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="last-name">Name</Label>
                <Input
                  id="last-name"
                  name="name"
                  placeholder="Robinson"
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? "Create an account" : "Sign in"}
            </Button>
          </div>
        </form>
        <Separator />
        <div className="mt-2">
          <OAuth />
        </div>
        <div className="mt-4 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't hane an account?"}
          &nbsp;
          <Link
            onClick={() => setIsSignup((ps) => !ps)}
            href="#"
            className="underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
