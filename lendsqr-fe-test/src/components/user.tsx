import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  MoreVertical,
  User as UserIcon,
  UserCheck,
  Wallet,
  PiggyBank,
  Filter,
} from "lucide-react";
import { mockApi, GetUsersResponse, UserFullData } from "../mockAPI";
import { storage } from "../storage";
import FilterPopup from "./filterPopup";
import "../styles/user.scss";

// Type definitions

type FilterMethodKey =
  | "setOrganizationFilter"
  | "setUsernameFilter"
  | "setEmailFilter"
  | "setDateJoinedFilter"
  | "setPhoneNumberFilter"
  | "setStatusFilter";

interface StorageInterface {
  getCurrentPage: () => number;
  setCurrentPage: (page: number) => void;
  getItemsPerPage: () => number;
  setItemsPerPage: (itemsPerPage: number) => void;

  // Explicitly defined filter methods
  setOrganizationFilter: (value: string) => void;
  setUsernameFilter: (value: string) => void;
  setEmailFilter: (value: string) => void;
  setDateJoinedFilter: (value: string) => void;
  setPhoneNumberFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
}

type User = Pick<
  UserFullData,
  | "id"
  | "organization"
  | "username"
  | "email"
  | "phoneNumber"
  | "dateJoined"
  | "status"
>;

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

interface StorageInterface {
  getCurrentPage: () => number;
  setCurrentPage: (page: number) => void;
  getItemsPerPage: () => number;
  setItemsPerPage: (itemsPerPage: number) => void;
  setCurrentPageFilter: (page: number) => void;
  setOrganizationFilter: (value: string) => void;
  setUsernameFilter: (value: string) => void;
  setEmailFilter: (value: string) => void;
  setDateJoinedFilter: (value: string) => void;
  setPhoneNumberFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
}

const Users: React.FC = () => {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(storage.getCurrentPage());
  const [itemsPerPage, setItemsPerPage] = useState(storage.getItemsPerPage());
  const [totalUsers, setTotalUsers] = useState(0);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  // Memoized calculations
  const totalPages = useMemo(
    () => Math.ceil(totalUsers / itemsPerPage),
    [totalUsers, itemsPerPage]
  );

  // Fetch users with error handling and simplified data transformation
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response: GetUsersResponse = await mockApi.getUsers(
        currentPage,
        itemsPerPage
      );

      const simplifiedUsers: User[] = response.data.map((user) => ({
        id: user.id,
        organization: user.organization,
        username: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateJoined: user.dateJoined,
        status: user.status,
      }));

      setUsers(simplifiedUsers);
      setTotalUsers(response.total);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  // Side effects
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    storage.setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    storage.setItemsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  // Event Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilter = (filters: UserFilters) => {
    // Update the current page to 1 when applying new filters
    storage.setCurrentPage(1);

    // Type-safe filter method mapping
    const filterMethodMap: Record<keyof UserFilters, FilterMethodKey> = {
      organization: "setOrganizationFilter",
      username: "setUsernameFilter",
      email: "setEmailFilter",
      dateJoined: "setDateJoinedFilter",
      phoneNumber: "setPhoneNumberFilter",
      status: "setStatusFilter",
    };

    // Update filters with type-safe method
    (Object.keys(filters) as Array<keyof UserFilters>).forEach((key) => {
      const value = filters[key];
      if (value !== undefined) {
        const methodName = filterMethodMap[key];
        (storage as StorageInterface)[methodName](value);
      }
    });
    fetchUsers();
    setIsFilterPopupOpen(false);
  };
  const getStatusClass = (status: string) => {
    const statusMap: Record<string, string> = {
      Active: "status--active",
      Inactive: "status--inactive",
      Pending: "status--pending",
      Blacklisted: "status--blacklisted",
    };
    return `status ${statusMap[status] || ""}`;
  };
  // Render components
  const renderStatsCards = () => (
    <div className="users__stats">
      {[
        { icon: <UserIcon />, title: "Total Users", value: totalUsers },
        {
          icon: <UserCheck />,
          title: "Active Users",
          value: Math.floor(totalUsers * 0.7),
          iconClass: "stat-card__icon--active",
        },
        {
          icon: <Wallet />,
          title: "Users with Loans",
          value: Math.floor(totalUsers * 0.3),
          iconClass: "stat-card__icon--loans",
        },
        {
          icon: <PiggyBank />,
          title: "Users with Savings",
          value: Math.floor(totalUsers * 0.5),
          iconClass: "stat-card__icon--savings",
        },
      ].map(({ icon, title, value, iconClass }) => (
        <div key={title} className="stat-card">
          <div className={`stat-card__icon ${iconClass || ""}`}>{icon}</div>
          <h3>{title}</h3>
          <p>{value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );

  const renderPagination = () => (
    <div className="users__pagination">
      <div className="users__pagination-select">
        <label>
          Show:
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="users__pagination-pages">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page <= 3 ||
              page === totalPages ||
              Math.abs(currentPage - page) <= 1
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="pagination-ellipsis">...</span>
              )}
              <button
                className={`pagination-button ${
                  currentPage === page ? "pagination-button--active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="users">
      <h1 className="users__title">Users</h1>

      {renderStatsCards()}

      <div className="users__table-container">
        {loading ? (
          <div className="users__loading">Loading users...</div>
        ) : (
          <>
            <table className="users__table">
              <thead>
                <tr>
                  {[
                    "Organization",
                    "User",
                    "Email",
                    "Phone Number",
                    "Date Joined",
                    "Status",
                    "",
                  ].map((header) => (
                    <th key={header}>
                      {header === "" ? (
                        <button
                          className="action-button"
                          aria-label="Filter"
                          onClick={() =>
                            setIsFilterPopupOpen(!isFilterPopupOpen)
                          }
                        >
                          <Filter size={16} />
                        </button>
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={getStatusClass(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-button"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {renderPagination()}
          </>
        )}
      </div>

      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default Users;
