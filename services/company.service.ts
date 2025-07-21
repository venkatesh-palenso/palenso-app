import APIService from "./api.service";
import { COMPANY_ENDPOINTS } from "@/constants/endpoints";
import {
  Company,
  CreateCompanyForm,
  UpdateCompanyForm,
} from "@/interfaces/company";

class CompanyService extends APIService {
  /**
   * Lists all companies.
   * @returns A promise that resolves to the list of companies.
   */
  listCompanies(): Promise<Company[]> {
    return this.get(COMPANY_ENDPOINTS.LIST_CREATE_COMPANY)
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
  createCompany(data: CreateCompanyForm): Promise<Company> {
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
  getCompany(companyId: string): Promise<Company> {
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
  updateCompany(companyId: string, data: UpdateCompanyForm) {
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
  deleteCompany(companyId: string) {
    return this.delete(COMPANY_ENDPOINTS.COMPANY_DETAIL(companyId))
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default CompanyService;
