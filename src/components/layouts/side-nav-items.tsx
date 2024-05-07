"use client";
import { NavItems } from "@/constants/nav-items";
import clsx from "clsx";
import { Home, Package } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const SideNavItems = ({ size = "lg" }: { size?: "xs" | "lg" }) => {
  const pathName = usePathname();
  const session = useSession();
  console.log(session);

  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {NavItems.map((l) => (
          <Link
            key={l.href}
            href={`/dashboard/${l.href}`}
            className={clsx(
              "hover:text-primary transition-all flex items-center gap-4 px-3 py-2 text-muted-foreground rounded-md ",
              size === "xs" && "text-lg mx-[-0.65rem]",
              pathName.split("/")[2] === l.href && "bg-accent text-primary "
            )}
          >
            <Home className="h-4 w-4" />
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideNavItems;
