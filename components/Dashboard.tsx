import React from "react";
import Sidebar from "./Sidebar";

interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  return <main>
      <Sidebar />
  </main>;
};

export default Dashboard;
