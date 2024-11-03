import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  MoreVertical,
  User as UserIcon,
  UserCheck,
  Wallet,
  PiggyBank,
  Filter,
  Eye,
  UserX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockApi, GetUsersResponse, UserFullData } from "../mockAPI";
import { storage } from "../storage";
import FilterPopup from "./filterPopup";
import "../styles/user.scss";

type FilterMethodKey =
  | "setOrganizationFilter"
  | "setUsernameFilter"
  | "setEmailFilter"
  | "setDateJoinedFilter"
  | "setPhoneNumberFilter"
  | "setStatusFilter";

interface UserDropdownProps {
  userId: string;
  isOpen: boolean;
  onAction: (action: string, userId: string) => void;
}
interface StorageInterface {
  getCurrentPage: () => number;
  setCurrentPage: (page: number) => void;
  getItemsPerPage: () => number;
  setItemsPerPage: (itemsPerPage: number) => void;
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

type User = Pick<
  UserFullData,
  | "id"
  | "organization"
  | "username"
  | "email"
  | "phoneNumber"
  | "dateJoined"
  | "status"
> & { id: string };

interface UserFilters {
  organization: string;
  username: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(storage.getCurrentPage());
  const [itemsPerPage, setItemsPerPage] = useState(storage.getItemsPerPage());
  const [totalUsers, setTotalUsers] = useState(0);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({
    organization: (storage as StorageInterface).getOrganizationFilter(),
    username: (storage as StorageInterface).getUsernameFilter(),
    email: (storage as StorageInterface).getEmailFilter(),
    dateJoined: (storage as StorageInterface).getDateJoinedFilter(),
    phoneNumber: (storage as StorageInterface).getPhoneNumberFilter(),
    status: (storage as StorageInterface).getStatusFilter(),
  });
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const navigate = useNavigate();

  const tableHeaders = useMemo(
    () => [
      { key: "organization", label: "Organization", alwaysShow: true },
      { key: "username", label: "User", alwaysShow: true },
      { key: "email", label: "Email", desktopOnly: true },
      { key: "phoneNumber", label: "Phone Number", alwaysShow: true },
      { key: "dateJoined", label: "Date Joined", alwaysShow: true },
      { key: "status", label: "Status", alwaysShow: true },
      { key: "actions", label: "", alwaysShow: true },
    ],
    []
  );

  const totalPages = useMemo(
    () => Math.ceil(totalUsers / itemsPerPage),
    [totalUsers, itemsPerPage]
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response: GetUsersResponse = await mockApi.getUsers(
        currentPage,
        itemsPerPage
      );

      const simplifiedUsers: User[] = response.data

        .filter((user) => {
          return (
            (!filters.organization ||
              user.organization
                .toLowerCase()
                .includes(filters.organization.toLowerCase())) &&
            (!filters.username ||
              `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(filters.username.toLowerCase())) &&
            (!filters.email ||
              user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
            (!filters.phoneNumber ||
              user.phoneNumber.includes(filters.phoneNumber)) &&
            (!filters.dateJoined ||
              user.dateJoined.includes(filters.dateJoined)) &&
            (!filters.status || user.status === filters.status)
          );
        })
        .map(
          (user) =>
            ({
              id: user.id.toString(),
              organization: user.organization,
              username: `${user.firstName} ${user.lastName}`,
              email: user.email,
              phoneNumber: user.phoneNumber,
              dateJoined: user.dateJoined,
              status: user.status,
            } as User)
        );

      setUsers(simplifiedUsers);
      setTotalUsers(response.total);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    storage.setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    storage.setItemsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId &&
        !(event.target as HTMLElement).closest(".action-dropdown")
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilter = (newFilters: UserFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);

    const storageImpl = storage as StorageInterface;
    Object.entries(newFilters).forEach(([key, value]) => {
      const methodName = `set${
        key.charAt(0).toUpperCase() + key.slice(1)
      }Filter` as FilterMethodKey;
      storageImpl[methodName](value);
    });
  };

  const handleUserAction = (action: string, userId: string) => {
    switch (action) {
      case "view":
        navigate(`/dashboard/user/${userId}`);
        break;
      case "blacklist":
        console.log("Blacklist user:", userId);
        break;
      case "activate":
        console.log("Activate user:", userId);
        break;
    }
    setOpenDropdownId(null);
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
          out of 100
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

  const UserDropdown: React.FC<UserDropdownProps> = ({
    userId,
    isOpen,
    onAction,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="user-dropdown">
        <div className="user-dropdown__menu">
          <button
            className="user-dropdown__item"
            onClick={() => onAction("view", userId)}
          >
            <Eye size={16} className="user-dropdown__icon" />
            <span>View Details</span>
          </button>

          <button
            className="user-dropdown__item"
            onClick={() => onAction("blacklist", userId)}
          >
            <UserX size={16} className="user-dropdown__icon" />
            <span>Blacklist User</span>
          </button>

          <button
            className="user-dropdown__item"
            onClick={() => onAction("activate", userId)}
          >
            <UserCheck size={16} className="user-dropdown__icon" />
            <span>Activate User</span>
          </button>
        </div>
      </div>
    );
  };

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
                  {tableHeaders.map(({ key, label, desktopOnly }) => (
                    <th key={key} className={desktopOnly ? "desktop-only" : ""}>
                      {key === "actions" ? (
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
                        label
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
                    <td className="desktop-only">{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <span className={getStatusClass(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-dropdown">
                        <button
                          className="action-button"
                          aria-label="More options"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(
                              openDropdownId === user.id ? null : user.id
                            );
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>
                        <UserDropdown
                          userId={user.id}
                          isOpen={openDropdownId === user.id}
                          onAction={handleUserAction}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {renderPagination()}
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default Users;
