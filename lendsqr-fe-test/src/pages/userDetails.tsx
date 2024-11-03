import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, StarHalf } from "lucide-react";
import { mockApi } from "../mockAPI";
import "../styles/Details.scss";

interface UserFullData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  dateJoined: string;
  status: string;
  socialMedia: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

interface TabItem {
  label: string;
  value: string;
}

const TABS: TabItem[] = [
  { label: "General Details", value: "general" },
  { label: "Documents", value: "documents" },
  { label: "Bank Details", value: "bank" },
  { label: "Loans", value: "loans" },
  { label: "Savings", value: "savings" },
  { label: "App and System", value: "app" },
];

const UserDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserFullData | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/users");
      return;
    }

    const user = mockApi.getUserById(parseInt(id));
    if (user) {
      setUserData(user);
    }
    setLoading(false);
  }, [id, navigate]);

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const formatCurrency = (amount: string): string => {
    return amount.startsWith("₦") ? amount : `₦${amount}`;
  };

  const InfoItem: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div className="info-item">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="user-details-container">
      <header className="page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" />
          <span>Back to Users</span>
        </button>

        <div className="action-buttons">
          <button
            className="btn blacklist"
            onClick={() => console.log("Blacklist user")}
          >
            BLACKLIST USER
          </button>
          <button
            className="btn activate"
            onClick={() => console.log("Activate user")}
          >
            ACTIVATE USER
          </button>
        </div>
      </header>

      <div className="main-profile-header">
        <div className="user-profile-header">
          <div className="avatar-section">
            <div className="avatar">
              <span className="avatar-icon">
                {getInitials(userData.firstName, userData.lastName)}
              </span>
            </div>
          </div>
          <div className="user-info">
            <h2 className="user-name">{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="user-id">{userData.username}</p>
          </div>
          <div className="tier-info">
            <p className="tier-label">User's Tier</p>
            <div className="tier-stars">
              <Star className="star" />
              <StarHalf className="star" />
              <Star className="star" fill="none" />
            </div>
            <div className="bank-info">
              {formatCurrency(userData.monthlyIncome)}
              <div className="bank-name">{userData.bvn}/Providus Bank</div>
            </div>
          </div>
        </div>
        <nav className="tabs-navigation">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`tab-item ${activeTab === tab.value ? "active" : ""}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="tab-content">
        <div className="info-sections">
          <section className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <InfoItem
                label="FULL NAME"
                value={`${userData.firstName} ${userData.lastName}`}
              />
              <InfoItem label="PHONE NUMBER" value={userData.phoneNumber} />
              <InfoItem label="EMAIL ADDRESS" value={userData.email} />
              <InfoItem label="BVN" value={userData.bvn} />
              <InfoItem label="GENDER" value={userData.gender} />
              <InfoItem label="MARITAL STATUS" value={userData.maritalStatus} />
              <InfoItem label="CHILDREN" value={userData.children} />
              <InfoItem
                label="TYPE OF RESIDENCE"
                value={userData.typeOfResidence}
              />
            </div>
          </section>

          <section className="info-section">
            <h3>Education and Employment</h3>
            <div className="info-grid">
              <InfoItem
                label="LEVEL OF EDUCATION"
                value={userData.levelOfEducation}
              />
              <InfoItem
                label="EMPLOYMENT STATUS"
                value={userData.employmentStatus}
              />
              <InfoItem
                label="SECTOR OF EMPLOYMENT"
                value={userData.sectorOfEmployment}
              />
              <InfoItem
                label="DURATION OF EMPLOYMENT"
                value={userData.employmentDuration}
              />
              <InfoItem label="OFFICE EMAIL" value={userData.officeEmail} />
              <InfoItem label="MONTHLY INCOME" value={userData.monthlyIncome} />
              <InfoItem
                label="LOAN REPAYMENT"
                value={formatCurrency(userData.loanRepayment)}
              />
            </div>
          </section>

          <section className="info-section">
            <h3>Socials</h3>
            <div className="info-grid">
              <InfoItem label="TWITTER" value={userData.socialMedia.twitter} />
              <InfoItem
                label="FACEBOOK"
                value={userData.socialMedia.facebook}
              />
              <InfoItem
                label="INSTAGRAM"
                value={userData.socialMedia.instagram}
              />
            </div>
          </section>

          <section className="info-section">
            <h3>Guarantor</h3>
            <div className="info-grid">
              <InfoItem
                label="FULL NAME"
                value={`${userData.guarantor.firstName} ${userData.guarantor.lastName}`}
              />
              <InfoItem
                label="PHONE NUMBER"
                value={userData.guarantor.phoneNumber}
              />
              <InfoItem
                label="EMAIL ADDRESS"
                value={userData.guarantor.email}
              />
              <InfoItem
                label="RELATIONSHIP"
                value={userData.guarantor.relationship}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
