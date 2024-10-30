import "../styles/user.scss";
import React, { useEffect, useState } from "react";
import { MoreVertical, User, UserCheck, Wallet, PiggyBank } from "lucide-react";

interface UserFullData {
  id: number;
  firstName: string;
  lastName: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
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

const mockApi = {
  getUsers: async (
    page: number,
    limit: number
  ): Promise<{ users: User[]; total: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = generateMockUsers(500);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      users: users.slice(start, end),
      total: users.length,
    };
  },
};

const generateRandomName = () => {
  const firstNames = [
    "Grace",
    "Debby",
    "Tosin",
    "Adedeji",
    "Olayinka",
    "Chioma",
    "Ngozi",
    "Folake",
    "Aisha",
    "Yetunde",
    "Samuel",
    "Ibrahim",
    "David",
    "Michael",
    "Elizabeth",
  ];
  const lastNames = [
    "Effiom",
    "Ogana",
    "Dokunmu",
    "Adebayo",
    "Okonkwo",
    "Okafor",
    "Ibrahim",
    "Adeyemi",
    "Ogunlesi",
    "Adeleke",
    "Johnson",
    "Williams",
    "Smith",
    "Brown",
    "Taylor",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
};

const generatePhoneNumber = () => {
  const prefixes = ["081", "090", "091", "080", "070", "01"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0");
  return `${prefix}${number}`;
};

const generateRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateMockUsers = (count: number): User[] => {
  const organizations = [
    "Lendsqr",
    "Lendstar",
    "Irorun",
    "PayFast",
    "CreditWise",
    "LoanPro",
    "QuickCash",
    "TrustLend",
    "SpeedFin",
    "EasyMoney",
  ];
  const statuses: User["status"][] = [
    "Active",
    "Inactive",
    "Pending",
    "Blacklisted",
  ];

  return Array.from({ length: count }, (_, index) => {
    const { firstName, lastName } = generateRandomName();
    const username = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;

    return {
      id: index + 1,
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      username,
      email,
      phoneNumber: generatePhoneNumber(),
      dateJoined: generateRandomDate(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await mockApi.getUsers(currentPage, itemsPerPage);
        setUsers(response.users);
        setTotalUsers(response.total);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="users">
      <h1 className="users__title">User Management</h1>

      <div className="users__stats">
        <div className="stat-card">
          <div className="stat-card__icon">
            <User />
          </div>
          <h3>Total Users</h3>
          <p>{totalUsers.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--active">
            <UserCheck />
          </div>
          <h3>Active Users</h3>
          <p>{Math.floor(totalUsers * 0.7).toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--loans">
            <Wallet />
          </div>
          <h3>Users with Loans</h3>
          <p>{Math.floor(totalUsers * 0.3).toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--savings">
            <PiggyBank />
          </div>
          <h3>Users with Savings</h3>
          <p>{Math.floor(totalUsers * 0.5).toLocaleString()}</p>
        </div>
      </div>

      <div className="users__table-container">
        {loading ? (
          <div className="users__loading">Loading users...</div>
        ) : (
          <>
            <table className="users__table">
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Date Joined</th>
                  <th>Status</th>
                  <th>
                    <span className="sr-only">Actions</span>
                  </th>
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

            <div className="users__pagination">
              <div className="users__pagination-select">
                <label>
                  Show:
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
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
                          currentPage === page
                            ? "pagination-button--active"
                            : ""
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
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
