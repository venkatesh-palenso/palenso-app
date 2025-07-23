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

interface AnalyticsMetric {
  total: number;
  this_week: number;
  this_month?: number;
}

export interface AdminAnalytics {
  total_users: AnalyticsMetric;
  events: AnalyticsMetric;
  companies: AnalyticsMetric;
  active_jobs: AnalyticsMetric;
}
export interface StudentAnalytics {
  interviews_scheduled: AnalyticsMetric;
  offers_received: AnalyticsMetric;
  saved_jobs: AnalyticsMetric;
  submitted_applications: AnalyticsMetric;
}
export interface EmployerAnalytics {
  active_jobs: AnalyticsMetric;
  applications: AnalyticsMetric;
  hires: AnalyticsMetric;
  interviews_scheduled: AnalyticsMetric;
}
