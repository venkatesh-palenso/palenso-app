// Job interface based on Django Job model
export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  job_type: "full_time" | "part_time" | "contract" | "internship" | "freelance";
  experience_level: "entry" | "mid" | "senior" | "executive";
  location: string;
  is_remote: boolean;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  required_skills?: string;
  preferred_skills?: string;
  category?: string;
  application_deadline?: string;
  max_applications?: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Job application interface based on Django JobApplication model
export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  cover_letter: string;
  resume_id?: string;
  status:
    | "pending"
    | "reviewed"
    | "shortlisted"
    | "interviewed"
    | "offered"
    | "hired"
    | "rejected"
    | "withdrawn";
  expected_salary?: number;
  available_from?: string;
  notes?: string;
  employer_notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Interview interface
export interface Interview {
  id: string;
  application_id: string;
  job_id: string;
  student_id: string;
  employer_id: string;
  interviewer_id: string;
  type: "Phone" | "Video" | "On-site" | "Technical" | "Behavioral";
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  scheduled_date: string;
  scheduled_time: string;
  duration: number; // in minutes
  location?: string;
  video_url?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

// Saved job interface based on Django SavedJob model
export interface SavedJob {
  id: string;
  student_id: string;
  job_id: string;
  saved_at: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Job form interfaces
export interface CreateJobForm {
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  job_type: "full_time" | "part_time" | "contract" | "internship" | "freelance";
  experience_level: "entry" | "mid" | "senior" | "executive";
  location: string;
  is_remote: boolean;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  required_skills?: string;
  preferred_skills?: string;
  category?: string;
  application_deadline?: string;
  max_applications?: number;
}

export interface UpdateJobForm extends Partial<CreateJobForm> {
  id: string;
  is_active?: boolean;
  is_featured?: boolean;
}

// Job application form interface
export interface CreateJobApplicationForm {
  job_id: string;
  cover_letter: string;
  resume_id?: string;
  expected_salary?: number;
  available_from?: string;
  notes?: string;
}

// Post job form interface (enhanced version of CreateJobForm)
export interface PostJobForm {
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  department: string;
  location: string;
  employment_type:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Freelance";
  experience_level: "Entry" | "Mid" | "Senior" | "Executive";
  remote_policy: "On-site" | "Remote" | "Hybrid";
  salary: {
    min: number;
    max: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
  };
  application_deadline: string;
  contact_email: string;
  contact_phone: string;
  max_applications?: number;
  is_featured?: boolean;
  tags?: string[];
  application_questions?: string[];
}

// Save job interface
export interface SaveJob {
  id: string;
  job_id: string;
  user_id: string;
  saved_at: string;
  notes?: string;
  priority?: "High" | "Medium" | "Low";
  created_at: string;
  updated_at: string;
}

// Save job form interface
export interface CreateSaveJobForm {
  job_id: string;
  notes?: string;
}

// Job search and filter interfaces
export interface JobSearchParams {
  search?: string;
  location?: string;
  job_type?:
    | "full_time"
    | "part_time"
    | "contract"
    | "internship"
    | "freelance";
  experience_level?: "entry" | "mid" | "senior" | "executive";
  salary_min?: number;
  salary_max?: number;
  skills?: string;
  company_id?: string;
  category?: string;
  is_active?: boolean;
  is_featured?: boolean;
}

// Job recommendation interface
export interface JobRecommendation {
  job_id: string;
  job_title: string;
  company_name: string;
  location: string;
  match_score: number;
  reason: string;
  skills_match: string[];
  created_at: string;
}

// Job analytics interface
export interface JobAnalytics {
  id: string;
  job_id: string;
  views_count: number;
  applications_count: number;
  saves_count: number;
  shares_count: number;
  conversion_rate: number;
  average_application_time: number; // in minutes
  created_at: string;
  updated_at: string;
}
