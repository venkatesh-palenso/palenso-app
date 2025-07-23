// Education interface based on Django Education model
export interface Education {
  id: string;
  profile_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  grade?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Institution interface
export interface Institution {
  id: string;
  name: string;
  type: "University" | "College" | "School" | "Institute" | "Academy";
  location: string;
  country: string;
  website?: string;
  logo_url?: string;
  accreditation?: string[];
  ranking?: number;
  created_at: string;
  updated_at: string;
}

// Degree interface
export interface Degree {
  id: string;
  name: string;
  level: "High School" | "Associate" | "Bachelor" | "Master" | "Doctorate" | "Certificate" | "Diploma";
  field: string;
  duration?: number; // in years
  description?: string;
  created_at: string;
  updated_at: string;
}

// Education form interfaces
export interface CreateEducationForm {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  grade?: string;
  description?: string;
}

export interface UpdateEducationForm extends Partial<CreateEducationForm> {
}

// Education search and filter interfaces
export interface EducationSearchParams {
  search?: string;
  institution?: string;
  degree?: string;
  field_of_study?: string;
  profile_id?: string;
}

// Education verification interface
export interface EducationVerification {
  id: string;
  education_id: string;
  status: "Pending" | "Verified" | "Rejected";
  verified_by?: string;
  verified_at?: string;
  verification_document_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
} 