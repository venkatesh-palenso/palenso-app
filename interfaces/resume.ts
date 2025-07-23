// Resume interface based on Django Resume model
export interface Resume {
  id: string;
  profile_id: string;
  title: string;
  file_url?: string;
  is_primary: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Resume template interface
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview_url: string;
  category: "Professional" | "Creative" | "Minimal" | "Modern" | "Classic";
  is_free: boolean;
  price?: number;
  features: string[];
  created_at: string;
  updated_at: string;
}

// Resume section interface
export interface ResumeSection {
  id: string;
  resume_id: string;
  type: "personal_info" | "summary" | "experience" | "education" | "skills" | "projects" | "languages" | "certifications" | "volunteer" | "awards";
  title: string;
  content: Record<string, unknown>; // JSON content for the section
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

// Resume form interfaces
export interface CreateResumeForm {
  title: string;
  file_url?: string;
  is_primary?: boolean;
  description?: string;
}

export interface UpdateResumeForm {
  title?: string;
  is_primary?: boolean;
  description?: string;
}

// Resume search and filter interfaces
export interface ResumeSearchParams {
  search?: string;
  profile_id?: string;
}

// Resume sharing interface
export interface ResumeSharing {
  id: string;
  resume_id: string;
  shared_by: string;
  shared_with: string;
  permission: "view" | "edit" | "download";
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// Resume analytics interface
export interface ResumeAnalytics {
  id: string;
  resume_id: string;
  views_count: number;
  downloads_count: number;
  shares_count: number;
  last_viewed_at?: string;
  last_downloaded_at?: string;
  created_at: string;
  updated_at: string;
} 