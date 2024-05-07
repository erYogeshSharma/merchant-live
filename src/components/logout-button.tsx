"use client";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>;
};

export default LogOut;
