import { DASHBOARD_ENDPOINTS } from "@/constants/endpoints";
import APIService from "./api.service";
import type {
  AdminAnalytics,
  EmployerAnalytics,
  StudentAnalytics,
} from "@/interfaces/analytics";
import {
  AdminDashboardInfo,
  EmployerDashboardInfo,
  StudentDashboardInfo,
} from "@/interfaces";

class DashboardService extends APIService {
  /**
   * Gets dashboard analytics.
   * @returns A promise that resolves to dashboard analytics data.
   */
  getDashboardAnalytics(): Promise<AdminAnalytics> {
    return this.get(DASHBOARD_ENDPOINTS.DASHBOARD_ANALYTICS)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Failed to fetch dashboard analytics:", error);
        throw error;
      });
  }

  /**
   * Gets dashboard info.
   * @returns A promise that resolves to dashboard info data.
   */
  getDashboardInfo(): Promise<any> {
    return this.get(DASHBOARD_ENDPOINTS.DASHBOARD_INFO)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Failed to fetch dashboard info:", error);
        throw error;
      });
  }

  /**
   * Gets all dashboard data in parallel for better performance.
   * @returns A promise that resolves to both analytics and info data.
   */
  async getDashboardData(): Promise<{
    analytics: AdminAnalytics | EmployerAnalytics | StudentAnalytics;
    dashboardInfo:
      | AdminDashboardInfo
      | EmployerDashboardInfo
      | StudentDashboardInfo;
  }> {
    try {
      const [analytics, dashboardInfo] = await Promise.all([
        this.getDashboardAnalytics(),
        this.getDashboardInfo(),
      ]);

      return { analytics, dashboardInfo };
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      throw error;
    }
  }
}

export default DashboardService;
