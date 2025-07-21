export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  company_size: string;
  founded_year: string;
  website: string;
  location: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  logo_url?: string;
  banner_image_url?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  employer_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyForm {
  name: string;
  description: string;
  industry: string;
  company_size: string;
  founded_year: string;
  website: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  logo_url?: string;
  banner_image_url?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export interface UpdateCompanyForm extends Partial<CreateCompanyForm> {
  id: string;
}
