import APIService from "./api.service";
import { COMPANY_ENDPOINTS } from "@/constants/endpoints";
import { ICompany } from "@/interfaces/company";

class CompanyService extends APIService {
  /**
   * Lists all companies.
   * @returns A promise that resolves to the list of companies.
   */
  listCompanies(): Promise<ICompany[]> {
    return this.get(COMPANY_ENDPOINTS.LIST_CREATE_COMPANY)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Searches companies with filters.
   * @param params - Search parameters (search, industry, location)
   * @returns A promise that resolves to the filtered list of companies.
   */
  searchCompanies(params: {
    search?: string;
    industry?: string;
    location?: string;
  }): Promise<ICompany[]> {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append("search", params.search);
    if (params.industry && params.industry !== "all")
      queryParams.append("industry", params.industry);
    if (params.location) queryParams.append("location", params.location);

    const url = queryParams.toString()
      ? `${COMPANY_ENDPOINTS.LIST_CREATE_COMPANY}?${queryParams.toString()}`
      : COMPANY_ENDPOINTS.LIST_CREATE_COMPANY;

    return this.get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
  /**
   * Creates a new company.
   * @param data - The data for the new company.
   * @returns A promise that resolves to the created company.
   */
  createCompany(data: ICompany): Promise<ICompany> {
    return this.post(COMPANY_ENDPOINTS.LIST_CREATE_COMPANY, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieves a company by its ID.
   * @param companyId - The ID of the company to retrieve.
   * @returns A promise that resolves to the company.
   */
  getCompany(companyId: string): Promise<ICompany> {
    return this.get(COMPANY_ENDPOINTS.COMPANY_DETAIL(companyId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates a company by its ID.
   * @param companyId - The ID of the company to update.
   * @param data - The data to update the company with.
   * @returns A promise that resolves to the updated company.
   */
  updateCompany(companyId: string, data: Partial<ICompany>): Promise<ICompany> {
    return this.put(COMPANY_ENDPOINTS.COMPANY_DETAIL(companyId), data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Deletes a company by its ID.
   * @param companyId - The ID of the company to delete.
   * @returns A promise that resolves to the deleted company.
   */
  deleteCompany(companyId: string): Promise<string> {
    return this.delete(COMPANY_ENDPOINTS.COMPANY_DETAIL(companyId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default CompanyService;
