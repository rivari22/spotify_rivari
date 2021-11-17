import React from 'react';
import Content from './Content';
import Sidebar from './Sidebar';

interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  return (
    <main>
      <Sidebar />
      <Content />
    </main>
  );
};

export default Dashboard;
