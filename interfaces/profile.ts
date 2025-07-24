import { ICompany, IUser } from "@/interfaces";

export interface IEducation {
  id?: string;
  profile: string; // profile ID (foreign key)
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string; // ISO date string
  end_date?: string | null;
  is_current: boolean;
  grade?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IWorkExperience {
  id?: string;
  profile: string;
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IProject {
  id?: string;
  profile: string;
  title: string;
  description: string;
  technologies_used?: string;
  project_url?: string;
  github_url?: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ISkill {
  id?: string;
  profile: string;
  name: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert";
  created_at?: string;
  updated_at?: string;
}

export interface IInterest {
  id?: string;
  profile: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IResume {
  id?: string;
  profile: string;
  title: string;
  file_url?: string | null;
  is_primary: boolean;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IProfile {
  id?: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  gender: string;
  date_of_birth: string;
  profile_picture_url: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export type IUserProfile = {
  user_id: string;
  profile_id: string;
} & Omit<IUser, "id"> &
  Omit<IProfile, "id">;

export interface IStudentProfile extends IUserProfile {
  educations: IEducation[];
  interests: IInterest[];
  skills: ISkill[];
  projects: IProject[];
  experiences: IWorkExperience[];
  resumes: IResume[];
}

export interface IEmployerProfile extends IUserProfile {
  company: ICompany;
}
