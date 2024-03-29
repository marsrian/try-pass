import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return <div>Dashboard</div>;
};

export default DashboardPage;
