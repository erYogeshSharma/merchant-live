"use-client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const LogOut = () => {
  function handleClick() {
    signOut();
  }
  return (
    <div>
      <Button onClick={handleClick}>Sign out</Button>
    </div>
  );
};

export default LogOut;
