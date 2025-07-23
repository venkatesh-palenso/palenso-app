// Company interface based on Django Company model
export interface Company {
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

// Company form interfaces
export interface CreateCompanyForm {
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
}

export interface UpdateCompanyForm extends Partial<CreateCompanyForm> {
  id: string;
  is_verified?: boolean;
  is_active?: boolean;
}

// Company search and filter interfaces
export interface CompanySearchParams {
  search?: string;
  industry?: string;
  company_size?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  country?: string;
  state?: string;
  city?: string;
  is_verified?: boolean;
  is_active?: boolean;
}

// Company analytics interface
export interface CompanyAnalytics {
  id: string;
  company_id: string;
  total_jobs_posted: number;
  total_applications_received: number;
  total_events_organized: number;
  total_event_registrations: number;
  average_job_views: number;
  average_application_rate: number;
  created_at: string;
  updated_at: string;
}
