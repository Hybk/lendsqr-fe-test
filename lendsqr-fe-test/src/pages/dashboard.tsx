import React from "react";
import Header from "../components/header";
import NavSidebar from "../components/navBar";
import "../styles/dashboard.scss";
import User from "../components/user";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__content">
        <aside className="dashboard__sidebar">
          <NavSidebar />
        </aside>
        <main className="dashboard__main">
          <User />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
