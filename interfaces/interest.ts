// Interest interface based on Django Interest model
export interface Interest {
  id: string;
  profile_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Interest form interfaces
export interface CreateInterestForm {
  name: string;
  description?: string;
}

export interface UpdateInterestForm extends Partial<CreateInterestForm> {
  id: string;
}

// Interest search and filter interfaces
export interface InterestSearchParams {
  search?: string;
  profile_id?: string;
}

// Interest category interface
export interface InterestCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

// Interest recommendation interface
export interface InterestRecommendation {
  interest_id: string;
  interest_name: string;
  category: string;
  relevance_score: number;
  related_skills?: string[];
  related_jobs?: string[];
} 