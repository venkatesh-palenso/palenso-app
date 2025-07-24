import { IUser } from "@/interfaces";

export interface MediumAvailabilityForm {
  email?: string;
  mobile_number?: string;
}

export interface MediumAvailabilityResponse {
  available: boolean;
  message: string;
  email?: string;
  mobile_number?: string;
}

export interface RequestMediumVerificationForm {
  user_id: string;
  email?: string;
  mobile_number?: string;
}

export interface MessageResponse {
  message: string;
}

export interface VerifyMediumForm {
  medium: "email" | "mobile";
  email?: string;
  mobile_number?: string;
  code: string;
}

export interface LoginForm {
  medium: "email" | "mobile";
  email?: string;
  mobile_number?: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface CreateUserForm {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "employer";
  channel: "email" | "mobile";
}

export interface CreateUserResponse {
  message: string;
  user: IUser;
}

export interface CompleteUserRegistrationForm {
  user_id: string;
  password: string;
  confirm_password: string;
}

export interface ForgotPasswordData {
  email?: string;
  mobile_number?: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface CheckUserExistenceForm {
  email?: string;
  mobile_number?: string;
}
