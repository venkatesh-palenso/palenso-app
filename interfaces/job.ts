// Job posting interface
export interface Job {
  id: string;
  title: string;
  company_id: string;
  employer_id: string;
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
  status: "Draft" | "Active" | "Paused" | "Closed" | "Expired";
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
}

// Job application interface
export interface JobApplication {
  id: string;
  job_id: string;
  student_id: string;
  employer_id: string;
  status:
    | "Pending"
    | "Under Review"
    | "Shortlisted"
    | "Interview Scheduled"
    | "Rejected"
    | "Hired";
  cover_letter: string;
  resume_url: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  expected_salary?: number;
  start_date?: string;
  additional_info?: string;
  applied_at: string;
  updated_at: string;
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

// Saved job interface
export interface SavedJob {
  id: string;
  job_id: string;
  student_id: string;
  saved_at: string;
}

// Job form interfaces
export interface CreateJobForm {
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
}

export interface UpdateJobForm extends Partial<CreateJobForm> {
  id: string;
  status?: "Draft" | "Active" | "Paused" | "Closed" | "Expired";
}

// Job application form interface
export interface CreateJobApplicationForm {
  job_id: string;
  cover_letter: string;
  resume: File;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  expected_salary?: number;
  start_date?: string;
  additional_info?: string;
}
