import React from "react";
import { ModeToggle } from "@/components/color-mode-toggle";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import LogOut from "./logout";

const SignIn = async () => {
  const session = await getServerSession(authConfig);

  return (
    <div className="container mx-auto min-h-screen place-content-center">
      <p>d</p>
    </div>
  );
};

export default SignIn;
