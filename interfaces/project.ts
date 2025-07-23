// Project interface based on Django Project model
export interface Project {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  technologies_used?: string;
  project_url?: string;
  github_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Project category interface
export interface ProjectCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

// Project form interfaces
export interface CreateProjectForm {
  title: string;
  description: string;
  technologies_used?: string;
  project_url?: string;
  github_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  image_url?: string;
}

export interface UpdateProjectForm extends Partial<CreateProjectForm> {}

// Project search and filter interfaces
export interface ProjectSearchParams {
  search?: string;
  technologies?: string;
  profile_id?: string;
}

// Project collaboration interface
export interface ProjectCollaboration {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  contribution: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}
