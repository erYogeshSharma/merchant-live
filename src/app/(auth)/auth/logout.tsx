"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogOut = () => {
  function handleClick() {
    signOut();
  }
  return (
    <div>
      <button onClick={handleClick}>Sign out</button>
    </div>
  );
};

export default LogOut;
