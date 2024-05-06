import DashboardWrapper from "@/components/layouts/dashboard-wrapper";
import Link from "next/link";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <DashboardWrapper>{children}</DashboardWrapper>
    </main>
  );
};

export default RootLayout;
