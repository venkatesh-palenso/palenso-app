export interface ICompany {
  id?: string;

  // Foreign key
  employer: string; // user ID

  // Company Information
  name: string;
  description: string;
  industry: string;
  company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  founded_year?: string | null; // ISO Date string

  // Contact Information
  website?: string;
  email?: string;
  phone?: string;

  // Location
  country: string;
  state: string;
  city: string;
  address?: string;

  // Company Media
  logo_url?: string;
  banner_image_url?: string;

  // Social Media
  linkedin?: string;
  twitter?: string;
  facebook?: string;

  // Status
  is_verified: boolean;
  is_active: boolean;

  // Optional timestamps
  created_at?: string;
  updated_at?: string;
}

export interface ICompanySearchParams {
  search?: string;
  industry?: string;
  company_size?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  country?: string;
  state?: string;
  city?: string;
  is_verified?: boolean;
  is_active?: boolean;
}
