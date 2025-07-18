import APIService from "./api.service";
import { COMPANY_ENDPOINTS } from "@/constants/endpoints";
import { Company, CreateCompanyForm, UpdateCompanyForm } from "@/interfaces/company";

class CompanyService extends APIService {
  async createCompany(data: CreateCompanyForm): Promise<Company> {
    const response = await this.post(COMPANY_ENDPOINTS.CREATE_COMPANY, data);
    return response.data;
  }

  async updateCompany(data: UpdateCompanyForm): Promise<Company> {
    const response = await this.put(COMPANY_ENDPOINTS.UPDATE_COMPANY, data);
    return response.data;
  }

  async getCompanyById(id: string): Promise<Company> {
    const response = await this.get(`${COMPANY_ENDPOINTS.GET_COMPANY_BY_ID}/${id}`);
    return response.data;
  }

  async getCompanies(): Promise<Company[]> {
    const response = await this.get(COMPANY_ENDPOINTS.GET_COMPANIES);
    return response.data;
  }

  async deleteCompany(id: string): Promise<void> {
    await this.delete(`${COMPANY_ENDPOINTS.DELETE_COMPANY}/${id}`);
  }
}

export default CompanyService; 