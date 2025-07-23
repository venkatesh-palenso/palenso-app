import AuthService from "./auth.service";
import UserService from "./user.service";
import CompanyService from "./company.service";
import MediaService from "./media.service";
import ProfileService from "./profile.service";
import EventService from "./event.service";
import JobService from "./job.service";

export const authService = new AuthService();
export const userService = new UserService();
export const companyService = new CompanyService();
export const mediaService = new MediaService();
export const profileService = new ProfileService();
export const jobService = new JobService();
export const eventService = new EventService
