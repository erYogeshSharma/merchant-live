"use-client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

import React from "react";

const OAuth = () => {
  function handleClick() {
    signIn("google");
  }

  return (
    <div className="mt-2">
      <Button onClick={handleClick} variant="outline" className="w-full">
        Continue with google
      </Button>
    </div>
  );
};

export default OAuth;
