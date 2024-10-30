import React, { useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import Logo from "../assets/Group.svg";
import profileImage from "../assets/aiony-haust-3TLl_97HNJo-unsplash.jpg";

import "../styles/header.scss";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="header__search">
        <input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="header__search-input"
        />
        <button className="header__search-button">
          <Search size={20} />
        </button>
      </div>

      <div className="header__actions">
        <a href="/docs" className="docs-link">
          Docs
        </a>
        <button className="notification-btn">
          <Bell size={20} />
        </button>
        <div className="profile">
          <img src={profileImage} alt="Profile" />
          <span>Adedeji</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
