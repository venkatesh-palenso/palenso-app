// Work Experience interface based on Django WorkExperience model
export interface WorkExperience {
  id: string;
  profile_id: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Experience form interfaces
export interface CreateExperienceForm {
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
}

export interface UpdateExperienceForm extends Partial<CreateExperienceForm> {
}

// Experience search and filter interfaces
export interface ExperienceSearchParams {
  search?: string;
  company?: string;
  position?: string;
  location?: string;
  profile_id?: string;
}

// Experience verification interface
export interface ExperienceVerification {
  id: string;
  experience_id: string;
  status: "Pending" | "Verified" | "Rejected";
  verified_by?: string;
  verified_at?: string;
  verification_document_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Experience reference interface
export interface ExperienceReference {
  id: string;
  experience_id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
  can_contact: boolean;
  created_at: string;
  updated_at: string;
} 