export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  founded_year: number;
  website: string;
  location: string;
  logo_url?: string;
  employer_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyForm {
  name: string;
  description: string;
  industry: string;
  size: string;
  founded_year: number;
  website: string;
  location: string;
  logo_url?: string;
}

export interface UpdateCompanyForm extends Partial<CreateCompanyForm> {
  id: string;
} 