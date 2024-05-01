import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link href="/sign-in" className="link">
        <Button>SignIn</Button>
      </Link>
      home here
    </div>
  );
};

export default Home;
