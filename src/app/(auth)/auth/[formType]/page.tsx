"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormEvent, useState } from "react";
import OAuth from "./o-auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = ({ params }: { params: { formType: string } }) => {
  const { data } = useSession();
  const router = useRouter();
  const isSignUp = params.formType === "sign-up";
  const [error, setError] = useState("");

  if (data?.user.email) {
    router.replace("/dashboard");
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError("");
    const signInResponse = await signIn("credentials", {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      isSignUp: isSignUp,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/dashboard");
    } else {
      console.log("Error", signInResponse);
      setError(signInResponse?.error || "Error while signing in");
    }
  }
  return (
    <div className="container mx-auto min-h-screen place-content-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            {isSignUp ? "Sign Up" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              {error && (
                <div className="text-sm text-black bg-red-100 rounded-sm p-2">
                  {error}
                </div>
              )}
            </div>
          </form>
          <Separator />
          <div className="mt-2">
            <OAuth />
          </div>
          <div className="mt-4 text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            &nbsp;
            <Link
              href={`/auth/${isSignUp ? "sign-in" : "sign-up"}`}
              onClick={() =>
                router.push(`/auth/${isSignUp ? "sign-in" : "sign-up"}`)
              }
              className="underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
