import "../styles/navBar.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  UserCheck,
  Wallet,
  Brain,
  PiggyBank,
  FileCheck,
  Shield,
  Star,
  Building2,
  Briefcase,
  Ban,
  Receipt,
  ArrowLeftRight,
  WrenchIcon,
  UserCog,
  FileText,
  BarChart3,
  Settings,
  DollarSign,
  ClipboardList,
  MessageSquare,
  Home,
  ChevronDown,
  LogOut,
} from "lucide-react";

interface Organization {
  value: string;
  label: string;
}
interface NavItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationData: NavSection[] = [
  {
    title: "CUSTOMERS",
    items: [
      {
        id: "users",
        title: "Users",
        icon: <Users size={20} />,
        path: "/users",
      },
      {
        id: "guarantors",
        title: "Guarantors",
        icon: <UserCheck size={20} />,
        path: "/guarantors",
      },
      {
        id: "loans",
        title: "Loans",
        icon: <Wallet size={20} />,
        path: "/loans",
      },
      {
        id: "decision-models",
        title: "Decision Models",
        icon: <Brain size={20} />,
        path: "/decision-models",
      },
      {
        id: "savings",
        title: "Savings",
        icon: <PiggyBank size={20} />,
        path: "/savings",
      },
      {
        id: "loan-requests",
        title: "Loan Requests",
        icon: <FileCheck size={20} />,
        path: "/loan-requests",
      },
      {
        id: "whitelist",
        title: "Whitelist",
        icon: <Shield size={20} />,
        path: "/whitelist",
      },
      { id: "karma", title: "Karma", icon: <Star size={20} />, path: "/karma" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      {
        id: "organization",
        title: "Organization",
        icon: <Building2 size={20} />,
        path: "/organization",
      },
      {
        id: "loan-products",
        title: "Loan Products",
        icon: <Briefcase size={20} />,
        path: "/loan-products",
      },
      {
        id: "savings-products",
        title: "Savings Products",
        icon: <Ban size={20} />,
        path: "/savings-products",
      },
      {
        id: "fees-charges",
        title: "Fees and Charges",
        icon: <Receipt size={20} />,
        path: "/fees-charges",
      },
      {
        id: "transactions",
        title: "Transactions",
        icon: <ArrowLeftRight size={20} />,
        path: "/transactions",
      },
      {
        id: "services",
        title: "Services",
        icon: <WrenchIcon size={20} />,
        path: "/services",
      },
      {
        id: "service-account",
        title: "Service Account",
        icon: <UserCog size={20} />,
        path: "/service-account",
      },
      {
        id: "settlements",
        title: "Settlements",
        icon: <FileText size={20} />,
        path: "/settlements",
      },
      {
        id: "reports",
        title: "Reports",
        icon: <BarChart3 size={20} />,
        path: "/reports",
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        id: "preferences",
        title: "Preferences",
        icon: <Settings size={20} />,
        path: "/preferences",
      },
      {
        id: "fees-pricing",
        title: "Fees and Pricing",
        icon: <DollarSign size={20} />,
        path: "/fees-pricing",
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        icon: <ClipboardList size={20} />,
        path: "/audit-logs",
      },
      {
        id: "systems-messages",
        title: "Systems Messages",
        icon: <MessageSquare size={20} />,
        path: "/systems-messages",
      },
    ],
  },
];

const NavItem: React.FC<NavItem & { isActive: boolean }> = ({
  title,
  icon,
  path,
  isActive,
}) => {
  return (
    <li className="nav-item">
      <a href={path} className={`nav-link ${isActive ? "active" : ""}`}>
        {icon}
        <span>{title}</span>
      </a>
    </li>
  );
};

const NavSection: React.FC<NavSection & { activeItemId: string }> = ({
  title,
  items,
  activeItemId,
}) => {
  return (
    <div className="nav-section">
      <h3 className="nav-section-title">{title}</h3>
      <ul className="nav-section-items">
        {items.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={item.id === activeItemId}
          />
        ))}
      </ul>
    </div>
  );
};

const NavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItemId] = useState("users");
  const [selectedOrg, setSelectedOrg] = useState<Organization>({
    value: "1",
    label: "Default Organization",
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const organizations: Organization[] = [
    { value: "1", label: "Default Organization" },
    { value: "2", label: "Test Organization 1" },
    { value: "3", label: "Test Organization 2" },
  ];

  const handleOrgChange = (org: Organization) => {
    setSelectedOrg(org);
    setIsDropdownOpen(false);
  };

  return (
    <div className="nav__body">
      <div className="nav__org-switcher">
        <button
          className="switcher-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Building2 size={16} />
          <span>{selectedOrg.label}</span>
          <ChevronDown size={16} />
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            {organizations.map((org) => (
              <div
                key={org.value}
                className="menu-item"
                onClick={() => handleOrgChange(org)}
              >
                {org.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav__dashboard">
        <Home size={20} />
        <span>Dashboard</span>
      </div>

      <nav className="nav-container">
        {navigationData.map((section, index) => (
          <NavSection key={index} {...section} activeItemId={activeItemId} />
        ))}
      </nav>

      <div className="nav__logout">
        <button
          className="logout-button"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        <div className="version">v1.2.0</div>
      </div>

      {showLogoutDialog && (
        <div className="logout-dialog-overlay">
          <div className="logout-dialog">
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="dialog-buttons">
              <button
                className="cancel-button"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
              <button className="confirm-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
