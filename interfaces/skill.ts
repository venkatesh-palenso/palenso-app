// Skill interface based on Django Skill model
export interface Skill {
  id: string;
  profile_id: string;
  name: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert";
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Skill form interfaces
export interface CreateSkillForm {
  name: string;
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface UpdateSkillForm extends Partial<CreateSkillForm> {}

// Skill search and filter interfaces
export interface SkillSearchParams {
  search?: string;
  proficiency_level?: "beginner" | "intermediate" | "advanced" | "expert";
  profile_id?: string;
}

// Skill category interface
export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

// Skill assessment interface
export interface SkillAssessment {
  id: string;
  skill_id: string;
  assessor_id: string;
  score: number;
  feedback?: string;
  assessment_date: string;
  created_at: string;
  updated_at: string;
}
