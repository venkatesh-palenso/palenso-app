export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string;
  role: "admin" | "student" | "employer";
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  is_active: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Student-specific profile interface
export interface StudentProfile {
  id: string;
  user_id: string;
  education: Education[];
  interests: string[];
  skills: Skill[];
  work_experience: WorkExperience[];
  projects: Project[];
  languages: Language[];
  summary: string;
  resume_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

// Employer-specific profile interface
export interface EmployerProfile {
  id: string;
  user_id: string;
  company_id: string;
  position: string;
  department: string;
  hire_count: number;
  created_at: string;
  updated_at: string;
}

// Admin-specific profile interface
export interface AdminProfile {
  id: string;
  user_id: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

// Education interface
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  gpa?: string;
  description?: string;
}

// Skill interface
export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
}

// Work Experience interface
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  current: boolean;
  description: string;
  achievements: string[];
}

// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github_url?: string;
  image_url?: string;
  start_date: string;
  end_date: string;
}

// Language interface
export interface Language {
  id: string;
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
}
