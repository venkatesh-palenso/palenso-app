import { AuthService } from './auth.service';
import { CompanyService } from './company.service';
import { JobService } from './job.service';
import { UserService } from './user.service';

// Base Service
export {
  BaseService,
  type RequestConfig,
  type ApiResponse,
  type ApiError,
} from './base.service';

// Auth Service
export { AuthService } from './auth.service';
// User Service
export { UserService } from './user.service';
// Job Service
export { JobService } from './job.service';
// Company Service
export { CompanyService } from './company.service';

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
} from './auth.service';
// User types
export type {
  User,
  UpdateUserData,
  UserPreferences,
  UserStats,
} from './user.service';
// Job types
export type {
  Job,
  CreateJobData,
  UpdateJobData,
  JobApplication,
  CreateApplicationData,
  JobSearchParams,
} from './job.service';
// Company types
export type {
  Company,
  CreateCompanyData,
  UpdateCompanyData,
  CompanyEmployee,
  CompanyReview,
  CreateReviewData,
} from './company.service';
