import { Button } from "@/components/ui/button";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authConfig);
  return (
    <div>
      {session?.user.email ? (
        <Link href="/dashboard/" className="link">
          <Button>Dashboard</Button>
        </Link>
      ) : (
        <Link href="/auth/sign-in" className="link">
          <Button>SignIn</Button>
        </Link>
      )}
      {session?.user.email}
      home here
    </div>
  );
};

export default Home;
