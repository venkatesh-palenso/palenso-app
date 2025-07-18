import AuthService from "./auth.service";
import UserService from "./user.service";
import CompanyService from "./company.service";
import MarketingService from "./marketing.service";
import NavigationService from "./navigation.service";

export const authService = new AuthService();
export const userService = new UserService();
export const companyService = new CompanyService();
export const marketingService = new MarketingService();
export const navigationService = new NavigationService();
