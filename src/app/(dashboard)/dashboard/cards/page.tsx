import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Cards = () => {
  return (
    <div>
      No Cards to show
      <Link href="/dashboard/cards/create">
        <Button>Create one</Button>
      </Link>
    </div>
  );
};

export default Cards;
