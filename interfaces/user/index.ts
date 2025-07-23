// Import related interfaces
import type {
  Education,
  WorkExperience,
  Skill,
  Interest,
  Project,
  Resume,
} from "@/interfaces";

// User interface based on Django User model
export interface User {
  id: string;
  username: string;
  mobile_number?: string;
  email?: string;
  first_name: string;
  last_name: string;
  role: "student" | "employer" | "admin";
  date_joined: string;
  last_location?: string;
  created_location?: string;
  is_superuser: boolean;
  is_managed: boolean;
  is_password_expired: boolean;
  is_active: boolean;
  is_staff: boolean;
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  is_password_autoset: boolean;
  token?: string;
  billing_address_country: string;
  billing_address?: Record<string, unknown>;
  has_billing_address: boolean;
  user_timezone: string;
  last_active?: string;
  last_login_time?: string;
  last_logout_time?: string;
  last_login_ip?: string;
  last_logout_ip?: string;
  last_login_medium: string;
  last_login_uagent?: string;
  token_updated_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Student Profile interface based on Django Profile model
export interface StudentProfile {
  id: string;
  user_id: string;
  bio?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  profile_picture_url?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  country?: string;
  state?: string;
  city?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;

  // Related data
  education?: Education[];
  work_experience?: WorkExperience[];
  skills?: Skill[];
  interests?: Interest[];
  projects?: Project[];
  resumes?: Resume[];
}

// Employer Profile interface based on Django Company model
export interface EmployerProfile {
  id: string;
  employer_id: string;
  name: string;
  description: string;
  industry: string;
  company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  founded_year?: string;
  website?: string;
  email?: string;
  phone?: string;
  country: string;
  state: string;
  city: string;
  address?: string;
  logo_url?: string;
  banner_image_url?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Token interface based on Django Token model
export interface Token {
  id: string;
  token: string;
  token_type:
    | "bearer"
    | "email_verification"
    | "otp_verification"
    | "forgot_password";
  user_id: string;
  is_used: boolean;
  expires_at: string;
  used_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// User form interfaces
export interface CreateUserForm {
  username: string;
  email?: string;
  mobile_number?: string;
  first_name: string;
  last_name: string;
  role: "student" | "employer" | "admin";
  password?: string;
}

export interface UpdateUserForm extends Partial<CreateUserForm> {}

export interface LoginForm {
  username: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
}

export interface ChangePasswordForm {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

// User search and filter interfaces
export interface UserSearchParams {
  search?: string;
  role?: "student" | "employer" | "admin";
  is_active?: boolean;
  date_joined_from?: string;
  date_joined_to?: string;
  location?: string;
}

// User analytics interface
export interface UserAnalytics {
  id: string;
  user_id: string;
  total_logins: number;
  last_login_date?: string;
  total_time_spent: number; // in minutes
  pages_visited: string[];
  features_used: string[];
  created_at: string;
  updated_at: string;
}
