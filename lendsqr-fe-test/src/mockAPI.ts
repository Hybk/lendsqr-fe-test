export interface GetUsersResponse {
  data: UserFullData[];
  total: number;
  page: number;
  limit: number;
}
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

  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced";
  children: string;
  typeOfResidence: string;

  levelOfEducation: string;
  employmentStatus: "Employed" | "Unemployed" | "Self-employed";
  sectorOfEmployment: string;
  employmentDuration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;

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

class MockApiService {
  private static instance: MockApiService;
  private users: UserFullData[] = [];

  private constructor() {
    this.generateMockUsers();
  }

  public static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  private getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private generatePhoneNumber(): string {
    return `0${Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")}`;
  }

  private generateBVN(): string {
    return `${Math.floor(Math.random() * 10000000000)
      .toString()
      .padStart(10, "0")}`;
  }

  private generateEmail(firstName: string, lastName: string): string {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.getRandomElement(
      domains
    )}`;
  }

  private generateWorkEmail(firstName: string, lastName: string): string {
    const companies = [
      "lendsqr.com",
      "paystack.com",
      "flutterwave.com",
      "kuda.com",
      "carbon.com",
    ];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.getRandomElement(
      companies
    )}`;
  }

  private generateMonthlyIncome(): string {
    const base = Math.floor(Math.random() * 250000) + 150000;
    return `₦${base.toLocaleString()}.00- ₦${(
      base + 200000
    ).toLocaleString()}.00`;
  }

  private generateDateJoined(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toISOString().split("T")[0];
  }

  private generateMockUsers() {
    const firstNames = [
      "Grace",
      "John",
      "Mary",
      "Michael",
      "Sarah",
      "David",
      "Emma",
      "James",
      "Linda",
      "Robert",
      "Patricia",
      "Daniel",
      "Barbara",
      "William",
      "Elizabeth",
    ];

    const lastNames = [
      "Effiom",
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Wilson",
    ];

    const organizations = [
      "Lendsqr",
      "Microsoft",
      "Google",
      "Facebook",
      "Twitter",
      "LinkedIn",
      "Amazon",
      "Apple",
      "Netflix",
      "Tesla",
    ];

    const residenceTypes = [
      "Parent's Apartment",
      "Rented Apartment",
      "Personal Apartment",
      "Family House",
      "Student Housing",
    ];

    const educationLevels = ["B.Sc", "HND", "M.Sc", "Ph.D", "OND"];

    const sectors = [
      "FinTech",
      "Banking",
      "Technology",
      "Education",
      "Healthcare",
      "Manufacturing",
      "Retail",
      "Telecommunications",
    ];

    const relationships = [
      "Parent",
      "Sibling",
      "Spouse",
      "Friend",
      "Colleague",
    ];
    const statuses: ("Active" | "Inactive" | "Pending" | "Blacklisted")[] = [
      "Active",
      "Inactive",
      "Pending",
      "Blacklisted",
    ];

    for (let i = 1; i <= 500; i++) {
      const firstName = this.getRandomElement(firstNames);
      const lastName = this.getRandomElement(lastNames);
      const guarantorFirstName = this.getRandomElement(firstNames);
      const guarantorLastName = this.getRandomElement(lastNames);

      const user: UserFullData = {
        id: i,
        firstName,
        lastName,
        organization: this.getRandomElement(organizations),
        username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
          Math.random() * 100
        )}`,
        email: this.generateEmail(firstName, lastName),
        phoneNumber: this.generatePhoneNumber(),
        dateJoined: this.generateDateJoined(),
        status: this.getRandomElement(statuses),

        bvn: this.generateBVN(),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        maritalStatus: this.getRandomElement(["Single", "Married", "Divorced"]),
        children: this.getRandomElement(["None", "1", "2", "3", "4"]),
        typeOfResidence: this.getRandomElement(residenceTypes),

        levelOfEducation: this.getRandomElement(educationLevels),
        employmentStatus: this.getRandomElement([
          "Employed",
          "Unemployed",
          "Self-employed",
        ]),
        sectorOfEmployment: this.getRandomElement(sectors),
        employmentDuration: `${Math.floor(Math.random() * 10) + 1} years`,
        officeEmail: this.generateWorkEmail(firstName, lastName),
        monthlyIncome: this.generateMonthlyIncome(),
        loanRepayment: (Math.floor(Math.random() * 80000) + 20000).toString(),

        socialMedia: {
          twitter: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
          facebook: `${firstName} ${lastName}`,
          instagram: `@${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
        },

        guarantor: {
          firstName: guarantorFirstName,
          lastName: guarantorLastName,
          phoneNumber: this.generatePhoneNumber(),
          email: this.generateEmail(guarantorFirstName, guarantorLastName),
          relationship: this.getRandomElement(relationships),
        },
      };

      this.users.push(user);
    }
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
