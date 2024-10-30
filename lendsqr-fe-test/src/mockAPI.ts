// mockApi.ts
export interface UserFullData {
  id: number;
  firstName: string;
  lastName: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";

  // Personal Information
  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced";
  children: string;
  typeOfResidence: string;

  // Education and Employment
  levelOfEducation: string;
  employmentStatus: "Employed" | "Unemployed" | "Self-employed";
  sectorOfEmployment: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;

  // Socials
  socialMedia: {
    twitter: string;
    facebook: string;
    instagram: string;
  };

  // Guarantor
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

class MockApiService {
  private static instance: MockApiService;
  private users: UserFullData[] = [];

  private constructor() {
    // Initialize with mock data
    this.generateMockUsers();
  }

  public static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  private generateMockUsers() {
    // Implementation of full user data generation
    // This will be used when we need the complete user details
  }

  public getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: this.users.slice(start, end),
      total: this.users.length,
      page,
      limit,
    };
  }

  public getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

export const mockApi = MockApiService.getInstance();
