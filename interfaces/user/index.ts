export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string;
  role: 'student' | 'employer';
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  is_active: boolean;
}