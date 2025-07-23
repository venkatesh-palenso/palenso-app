// Analytics Metric Interface
export interface AnalyticsMetric {
  total: number;
  this_week: number;
  this_month?: number;
}

// Dashboard Analytics Interface
export interface DashboardAnalytics {
  total_users: AnalyticsMetric;
  companies: AnalyticsMetric;
  active_jobs: AnalyticsMetric;
  events: AnalyticsMetric;
  applications: AnalyticsMetric;
  interviews_scheduled: AnalyticsMetric;
  hires: AnalyticsMetric;
  submitted_applications: AnalyticsMetric;
  interviews: AnalyticsMetric;
  profile_views: AnalyticsMetric;
  saved_jobs: AnalyticsMetric;
  applied_jobs: AnalyticsMetric;
  total_applications?: number;
  pending_applications?: number;
  completed_interviews?: number;
  user_growth?: number;
  job_growth?: number;
  application_growth?: number;
  revenue_growth?: number;
}

// User Interface for Dashboard
export interface DashboardUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "employer" | "admin";
  date_joined: string;
  is_active: boolean;
  profile_picture_url?: string;
}

// Job Interface for Dashboard
export interface DashboardJob {
  id: string;
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  application_count?: number;
  views?: number;
  application_deadline?: string;
  status?: string;
  isSaved?: boolean;
  isApplied?: boolean;
}

// Application Interface for Dashboard
export interface DashboardApplication {
  id: string;
  job_title: string;
  company_name: string;
  applicant_name: string;
  candidateName: string;
  jobTitle: string;
  location: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "interviewed" | "hired" | "rejected";
  applied_date: string;
  resume_url?: string;
  cover_letter?: string;
}

// Event Interface for Dashboard
export interface DashboardEvent {
  id: string;
  title: string;
  description: string;
  event_type: string;
  type: string;
  location: string;
  start_date: string;
  end_date: string;
  date: string;
  time: string;
  is_virtual: boolean;
  registration_fee?: number;
  is_active: boolean;
  is_featured: boolean;
  registered_count?: number;
}

// Interview Interface for Dashboard
export interface DashboardInterview {
  id: string;
  job_title: string;
  company_name: string;
  candidate_name: string;
  interview_date: string;
  interview_type: "phone" | "video" | "in-person";
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  title: string;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

// System Alert Interface for Dashboard
export interface SystemAlert {
  id: string;
  type: "success" | "warning" | "error" | "info";
  message: string;
  timestamp: string;
  is_read: boolean;
}

// Admin Dashboard Info Interface
export interface AdminDashboardInfo {
  recent_users: DashboardUser[];
  system_alerts: SystemAlert[];
  pending_approvals?: number;
  system_health?: string;
}

// Employer Dashboard Info Interface
export interface EmployerDashboardInfo {
  active_jobs: DashboardJob[];
  recent_applications: DashboardApplication[];
  upcoming_interviews: DashboardInterview[];
  company_events: DashboardEvent[];
  upcoming_events: DashboardEvent[];
  total_applications?: number;
  pending_reviews?: number;
}

// Student Dashboard Info Interface
export interface StudentDashboardInfo {
  recommended_jobs: DashboardJob[];
  recent_job_opportunities: DashboardJob[];
  upcoming_events: DashboardEvent[];
  scheduled_interviews: DashboardInterview[];
  upcoming_interviews: DashboardInterview[];
  saved_jobs: DashboardJob[];
  applied_jobs: DashboardJob[];
  total_applications?: number;
  interviews_count?: number;
}
