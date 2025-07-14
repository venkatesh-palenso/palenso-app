import { AuthService } from './AuthService';
import { CompanyService } from './CompanyService';
import { JobService } from './JobService';
import { UserService } from './UserService';

// Base Service
export {
  BaseService,
  type RequestConfig,
  type ApiResponse,
  type ApiError,
} from './BaseService';

// Auth Service
export { AuthService } from './AuthService';
// User Service
export { UserService } from './UserService';
// Job Service
export { JobService } from './JobService';
// Company Service
export { CompanyService } from './CompanyService';

const DEFAULT_API_URL = 'http://localhost:8000/api';

// Service instances
export const authService = new AuthService(DEFAULT_API_URL);
export const userService = new UserService(DEFAULT_API_URL);
export const jobService = new JobService(DEFAULT_API_URL);
export const companyService = new CompanyService(DEFAULT_API_URL);

// Auth types
export type {
  LoginData,
  ForgotPasswordData,
  ResetPasswordData,
  VerifyEmailData,
  VerifyMobileData,
  SendOTPData,
  CheckAvailabilityData,
  SSOLoginData,
  SendVerificationResponse,
  AuthResponse,
  OTPResponse,
  AvailabilityResponse,
} from './AuthService';
// User types
export type {
  User,
  UpdateUserData,
  UserPreferences,
  UserStats,
} from './UserService';
// Job types
export type {
  Job,
  CreateJobData,
  UpdateJobData,
  JobApplication,
  CreateApplicationData,
  JobSearchParams,
} from './JobService';
// Company types
export type {
  Company,
  CreateCompanyData,
  UpdateCompanyData,
  CompanyEmployee,
  CompanyReview,
  CreateReviewData,
} from './CompanyService';
