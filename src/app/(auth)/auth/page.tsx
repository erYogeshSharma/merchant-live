import React from "react";
import { LoginForm } from "./auth-form";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import LogOut from "./logout";

const SignIn = async () => {
  const session = await getServerSession(authConfig);
  return (
    <div className="container mx-auto min-h-screen place-content-center">
      <LogOut />

      <LoginForm />
    </div>
  );
};

export default SignIn;
