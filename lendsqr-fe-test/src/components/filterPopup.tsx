import React, { useState } from "react";
import { storage } from "../storage";
import "../styles/filter.scss";

// Define a more specific interface for filters
interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

// Explicitly type the storage methods
interface StorageInterface {
  getOrganizationFilter: () => string;
  getUsernameFilter: () => string;
  getEmailFilter: () => string;
  getDateJoinedFilter: () => string;
  getPhoneNumberFilter: () => string;
  getStatusFilter: () => string;
}

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: UserFilters) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  isOpen,
  onClose,
  onFilter,
}) => {
  // Type the storage interface to ensure type safety
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

  const handleReset = () => {
    setOrganization("");
    setUsername("");
    setEmail("");
    setDateJoined("");
    setPhoneNumber("");
    setStatus("");
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

  // Add overlay click handler to close popup when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="filter-popup__overlay" onClick={handleOverlayClick}>
      <div className="filter-popup__content">
        <h3 className="filter-popup__title">Filter Users</h3>
        <div className="filter-popup__form">
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Organization:</span>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="filter-popup__input"
            />
          </label>
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="filter-popup__input"
            />
          </label>
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="filter-popup__input"
            />
          </label>
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Date Joined:</span>
            <input
              type="date"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
              className="filter-popup__input"
            />
          </label>
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Phone Number:</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="filter-popup__input"
            />
          </label>
          <label className="filter-popup__label">
            <span className="filter-popup__label-text">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="filter-popup__input"
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </label>
        </div>
        <div className="filter-popup__actions">
          <button
            className="filter-popup__button filter-popup__button--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="filter-popup__button filter-popup__button--primary"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
