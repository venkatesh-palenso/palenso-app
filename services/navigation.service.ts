import APIService from "./api.service";
import { NavItem } from "@/interfaces/nav-item";

class NavigationService extends APIService {
  async getHeaderNavigation(): Promise<NavItem[]> {
    const response = await this.get('/api/navigation/header');
    return response.data;
  }

  async getStudentNavigation(): Promise<NavItem[]> {
    const response = await this.get('/api/navigation/student');
    return response.data;
  }

  async getEmployerNavigation(): Promise<NavItem[]> {
    const response = await this.get('/api/navigation/employer');
    return response.data;
  }

  async getNavigationByRole(role: "student" | "employer"): Promise<NavItem[]> {
    const response = await this.get(`/api/navigation/${role}`);
    return response.data;
  }
}

export default NavigationService; 