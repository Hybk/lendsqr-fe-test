export const storage = {
  getItemsPerPage: (): number => {
    const stored = localStorage.getItem("itemsPerPage");
    return stored ? parseInt(stored, 10) : 10;
  },

  setItemsPerPage: (value: number): void => {
    localStorage.setItem("itemsPerPage", value.toString());
  },

  getCurrentPage: (): number => {
    const stored = localStorage.getItem("currentPage");
    return stored ? parseInt(stored, 10) : 1;
  },

  setCurrentPage: (value: number): void => {
    localStorage.setItem("currentPage", value.toString());
  },

  setColumnFilter: (column: string, value: string): void => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    filters[column] = value;
    localStorage.setItem("columnFilters", JSON.stringify(filters));
  },

  getColumnFilters: () => {
    return JSON.parse(localStorage.getItem("columnFilters") || "{}");
  },

  removeColumnFilter: (column: string): void => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    delete filters[column];
    localStorage.setItem("columnFilters", JSON.stringify(filters));
  },

  clearColumnFilters: (): void => {
    localStorage.removeItem("columnFilters");
  },

  getOrganizationFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.organization || "";
  },
  getUsernameFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.username || "";
  },
  getEmailFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.email || "";
  },
  getDateJoinedFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.dateJoined || "";
  },
  getPhoneNumberFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.phoneNumber || "";
  },
  getStatusFilter: (): string => {
    const filters = JSON.parse(localStorage.getItem("columnFilters") || "{}");
    return filters.status || "";
  },
};
