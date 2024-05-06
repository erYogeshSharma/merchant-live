"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import LogOut from "./logout";

const OAuth = () => {
  function handleClick() {
    signIn("google");
  }
  const session = useSession();
  return (
    <div className="mt-2">
      <Button onClick={handleClick} variant="outline" className="w-full">
        Continue with google
      </Button>
      <p>{session.data?.user?.email}</p>
    </div>
  );
};

export default OAuth;
