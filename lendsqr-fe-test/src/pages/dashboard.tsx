import Header from "../components/header";
import NavSidebar from "../components/navBar";
import "../styles/dashboard.scss";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <Header />
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>
      <div className="dashboard__content">
        <aside className={`dashboard__sidebar ${isSidebarOpen ? "open" : ""}`}>
          <NavSidebar />
        </aside>
        <main className="dashboard__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
