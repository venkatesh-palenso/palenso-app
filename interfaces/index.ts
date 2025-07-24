// user interfaces
export * from "./user";

// profile interfaces
export * from "./profile";

// auth interfaces
export * from "./auth";

// Job interfaces
export * from "./job";

// Event interfaces
export * from "./event";

// Company interfaces
export * from "./company";

// Analytics interfaces
export * from "./analytics";

// Dashboard interfaces
export * from "./dashboard";

// Marketing interfaces
export * from "./marketing";

// Navigation interfaces
export * from "./nav-item";

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type { IUser, IUserSearchParams } from "./user";

export type {
  IProfile,
  IUserProfile,
  IStudentProfile,
  IEmployerProfile,
  IEducation,
  IWorkExperience,
  IProject,
  ISkill,
  IInterest,
  IResume,
} from "./profile";

export type {
  Job,
  JobApplication,
  SavedJob,
  CreateJobForm,
  UpdateJobForm,
  CreateJobApplicationForm,
  CreateSaveJobForm,
  JobSearchParams,
  JobRecommendation,
  JobAnalytics,
} from "./job";

export type {
  Event,
  EventRegistration,
  CreateEventForm,
  UpdateEventForm,
  CreateEventRegistrationForm,
  EventSearchParams,
  EventRecommendation,
  EventAnalytics,
} from "./event";

export type { ICompany, ICompanySearchParams } from "./company";
