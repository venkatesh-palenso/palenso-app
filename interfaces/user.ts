export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  role: "admin" | "student" | "employer";
  is_active: boolean;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  is_password_expired: boolean;
  date_joined: string;
  last_active: string;
  last_login_time: string;
}

export interface IUserSearchParams {
  search?: string;
  role?: "admin" | "student" | "employer";
  is_active?: boolean;
  date_joined_from?: string;
  date_joined_to?: string;
  location?: string;
  page?: number;
  limit?: number;
}
