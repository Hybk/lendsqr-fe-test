import React, { useState, useRef, useEffect } from "react";
import { storage } from "../storage";
import "../styles/filter.scss";

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

interface StorageInterface {
  getOrganizationFilter: () => string;
  getUsernameFilter: () => string;
  getEmailFilter: () => string;
  getDateJoinedFilter: () => string;
  getPhoneNumberFilter: () => string;
  getStatusFilter: () => string;
  setOrganizationFilter: (value: string) => void;
  setUsernameFilter: (value: string) => void;
  setEmailFilter: (value: string) => void;
  setDateJoinedFilter: (value: string) => void;
  setPhoneNumberFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
}

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: UserFilters) => void;
  anchorEl: HTMLElement | null;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  onFilter,
  anchorEl,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const storageImpl = storage as StorageInterface;

  const [organization, setOrganization] = useState(
    storageImpl.getOrganizationFilter()
  );
  const [username, setUsername] = useState(storageImpl.getUsernameFilter());
  const [email, setEmail] = useState(storageImpl.getEmailFilter());
  const [dateJoined, setDateJoined] = useState(
    storageImpl.getDateJoinedFilter()
  );
  const [phoneNumber, setPhoneNumber] = useState(
    storageImpl.getPhoneNumberFilter()
  );
  const [status, setStatus] = useState(storageImpl.getStatusFilter());

  useEffect(() => {
    const updatePosition = () => {
      if (anchorEl && dropdownRef.current) {
        const rect = anchorEl.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const spacing = 8;

        let top = rect.bottom + window.scrollY + spacing;
        let left = rect.left + window.scrollX;

        if (left + dropdownRect.width > window.innerWidth) {
          left = rect.right - dropdownRect.width;
        }

        if (top + dropdownRect.height > window.innerHeight + window.scrollY) {
          top = rect.top + window.scrollY - dropdownRect.height - spacing;
        }
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      updatePosition();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, anchorEl, onClose]);

  const handleReset = () => {
    setOrganization("");
    setUsername("");
    setEmail("");
    setDateJoined("");
    setPhoneNumber("");
    setStatus("");

    onFilter({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });
  };

  const handleFilter = () => {
    const filters: UserFilters = {
      organization,
      username,
      email,
      dateJoined,
      phoneNumber,
      status,
    };
    onFilter(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="filter-dropdown__content">
      <div className="filter-dropdown__form">
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Organization</span>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="filter-dropdown__input"
          />
        </label>
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="filter-dropdown__input"
          />
        </label>
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="filter-dropdown__input"
          />
        </label>
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Date Joined</span>
          <input
            type="date"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
            className="filter-dropdown__input"
          />
        </label>
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Phone Number</span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="filter-dropdown__input"
          />
        </label>
        <label className="filter-dropdown__label">
          <span className="filter-dropdown__label-text">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="filter-dropdown__input"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </label>
      </div>
      <div className="filter-dropdown__actions">
        <button
          className="filter-dropdown__button filter-dropdown__button--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="filter-dropdown__button filter-dropdown__button--primary"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
