import APIService from "./api.service";
import { MarketingData } from "@/interfaces/marketing";

class MarketingService extends APIService {
  async getMarketingData(): Promise<MarketingData> {
    const response = await this.get('/api/marketing/data');
    return response.data;
  }

  async getStats(): Promise<MarketingData['stats']> {
    const response = await this.get('/api/marketing/stats');
    return response.data;
  }

  async getFeatures(): Promise<MarketingData['features']> {
    const response = await this.get('/api/marketing/features');
    return response.data;
  }
}

export default MarketingService; 