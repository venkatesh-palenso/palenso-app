import { User } from '@/interfaces/user';

export interface CheckAvailabilityForm {
  email?: string;
  mobile_number?: string;
}

export interface AvailabilityResponse {
  available: boolean;
  message: string;
  email?: string;
  mobile_number?: string;
}

export interface CreateUserForm {
  first_name: string;
  last_name: string;
  email: string;
  role: 'student' | 'employer';
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface RequestEmailCodeForm {
  email: string;
  user_id: string;
}

export interface RequestMobileCodeForm {
  mobile_number: string;
  user_id: string;
}

export interface VerifyEmailForm {
  email: string;
  code: string;
}

export interface VerifyMobileForm {
  mobile_number: string;
  code: string;
}

export interface VerificationRequestResponse {
  message: string;
}

export interface CompleteUserRegistrationForm {
  user_id: string;
  password: string;
  confirm_password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
  confirm_password: string;
}
