import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <div className="max-w-sceen">{JSON.stringify(session)}</div>
    </div>
  );
};

export default Dashboard;
