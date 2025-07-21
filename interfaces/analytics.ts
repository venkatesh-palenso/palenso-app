// Base analytics interface
export interface BaseAnalytics {
  total_users: number;
  active_users: number;
  new_users_this_week: number;
  new_users_this_month: number;
  growth_rate: number;
}

// Admin analytics interface
export interface AdminAnalytics extends BaseAnalytics {
  total_employers: number;
  total_students: number;
  total_jobs: number;
  total_events: number;
  total_applications: number;
  total_registrations: number;
  top_companies: CompanyStats[];
  top_jobs: JobStats[];
  top_events: EventStats[];
  user_growth: GrowthData[];
  application_trends: TrendData[];
  registration_trends: TrendData[];
}

// Employer analytics interface
export interface EmployerAnalytics {
  active_jobs: number;
  total_applications: number;
  applications_this_week: number;
  interviews_scheduled: number;
  interviews_this_week: number;
  hires_this_month: number;
  hires_this_week: number;
  job_views: number;
  application_rate: number;
  conversion_rate: number;
  top_performing_jobs: JobPerformance[];
  recent_applications: ApplicationStats[];
  upcoming_interviews: InterviewStats[];
  hiring_trends: TrendData[];
}

// Student analytics interface
export interface StudentAnalytics {
  applications_submitted: number;
  applications_this_month: number;
  interviews_scheduled: number;
  interviews_completed: number;
  events_registered: number;
  upcoming_events: number;
  saved_jobs: number;
  profile_views: number;
  application_success_rate: number;
  recent_applications: ApplicationStats[];
  upcoming_interviews: InterviewStats[];
  recommended_jobs: JobRecommendation[];
  skill_gaps: SkillGap[];
  career_progress: ProgressData[];
}

// Supporting interfaces
export interface CompanyStats {
  company_id: string;
  company_name: string;
  jobs_posted: number;
  applications_received: number;
  hires_made: number;
  events_hosted: number;
}

export interface JobStats {
  job_id: string;
  job_title: string;
  company_name: string;
  applications_received: number;
  views_count: number;
  conversion_rate: number;
}

export interface EventStats {
  event_id: string;
  event_title: string;
  company_name: string;
  registrations: number;
  attendance_rate: number;
  average_rating: number;
}

export interface JobPerformance {
  job_id: string;
  job_title: string;
  applications_received: number;
  views_count: number;
  interviews_scheduled: number;
  hires_made: number;
  conversion_rate: number;
}

export interface ApplicationStats {
  application_id: string;
  job_title: string;
  company_name: string;
  status: string;
  applied_date: string;
  last_updated: string;
}

export interface InterviewStats {
  interview_id: string;
  job_title: string;
  company_name: string;
  scheduled_date: string;
  scheduled_time: string;
  type: string;
  status: string;
}

export interface JobRecommendation {
  job_id: string;
  job_title: string;
  company_name: string;
  match_score: number;
  skills_match: string[];
  salary_range: string;
  location: string;
  posted_date: string;
}

export interface SkillGap {
  skill_name: string;
  current_level: string;
  required_level: string;
  gap_score: number;
  learning_resources: string[];
}

export interface GrowthData {
  date: string;
  value: number;
  change: number;
}

export interface TrendData {
  period: string;
  value: number;
  previous_value: number;
  change_percentage: number;
}

export interface ProgressData {
  metric: string;
  current_value: number;
  target_value: number;
  progress_percentage: number;
  trend: "up" | "down" | "stable";
}
