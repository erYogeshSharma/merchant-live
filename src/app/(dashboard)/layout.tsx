import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/auth/sign-in");
  }
  return (
    <main>
      <DashboardWrapper>{children}</DashboardWrapper>
    </main>
  );
};

export default RootLayout;
