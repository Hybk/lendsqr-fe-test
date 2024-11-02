// storage.ts
class Storage {
  private storage: { [key: string]: string } = {};

  // Page management
  getCurrentPage(): number {
    return parseInt(this.storage.currentPage || "1", 10);
  }

  setCurrentPage(page: number): void {
    this.storage.currentPage = page.toString();
  }

  getItemsPerPage(): number {
    return parseInt(this.storage.itemsPerPage || "10", 10);
  }

  setItemsPerPage(itemsPerPage: number): void {
    this.storage.itemsPerPage = itemsPerPage.toString();
  }

  // Filter getters
  getOrganizationFilter(): string {
    return this.storage.organizationFilter || "";
  }

  getUsernameFilter(): string {
    return this.storage.usernameFilter || "";
  }

  getEmailFilter(): string {
    return this.storage.emailFilter || "";
  }

  getDateJoinedFilter(): string {
    return this.storage.dateJoinedFilter || "";
  }

  getPhoneNumberFilter(): string {
    return this.storage.phoneNumberFilter || "";
  }

  getStatusFilter(): string {
    return this.storage.statusFilter || "";
  }

  // Filter setters
  setOrganizationFilter(value: string): void {
    this.storage.organizationFilter = value;
  }

  setUsernameFilter(value: string): void {
    this.storage.usernameFilter = value;
  }

  setEmailFilter(value: string): void {
    this.storage.emailFilter = value;
  }

  setDateJoinedFilter(value: string): void {
    this.storage.dateJoinedFilter = value;
  }

  setPhoneNumberFilter(value: string): void {
    this.storage.phoneNumberFilter = value;
  }

  setStatusFilter(value: string): void {
    this.storage.statusFilter = value;
  }
}

export const storage = new Storage();
