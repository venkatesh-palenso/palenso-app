// User interfaces
export * from "./user";

// Profile interfaces
export * from "./education";
export * from "./experience";
export * from "./skill";
export * from "./interest";
export * from "./project";
export * from "./resume";

// Job interfaces
export * from "./job";

// Event interfaces
export * from "./event";

// Company interfaces
export * from "./company";

// Analytics interfaces
export * from "./analytics";

// Marketing interfaces
export * from "./marketing";

// Navigation interfaces
export * from "./nav-item";

// Re-export specific interfaces for convenience
export type {
  User,
  StudentProfile,
  EmployerProfile,
  Token,
  CreateUserForm,
  UpdateUserForm,
  LoginForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  ChangePasswordForm,
  UserSearchParams,
  UserAnalytics,
} from "./user";

export type {
  Education,
  CreateEducationForm,
  UpdateEducationForm,
  EducationSearchParams,
  EducationVerification,
} from "./education";

export type {
  WorkExperience,
  CreateExperienceForm,
  UpdateExperienceForm,
  ExperienceSearchParams,
  ExperienceVerification,
  ExperienceReference,
} from "./experience";

export type {
  Skill,
  CreateSkillForm,
  UpdateSkillForm,
  SkillSearchParams,
  SkillCategory,
  SkillAssessment,
} from "./skill";

export type {
  Interest,
  CreateInterestForm,
  UpdateInterestForm,
  InterestSearchParams,
  InterestCategory,
} from "./interest";

export type {
  Project,
  CreateProjectForm,
  UpdateProjectForm,
  ProjectSearchParams,
  ProjectCollaboration,
} from "./project";

export type {
  Resume,
  CreateResumeForm,
  UpdateResumeForm,
  ResumeSearchParams,
  ResumeSharing,
  ResumeAnalytics,
} from "./resume";

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

export type {
  Company,
  CreateCompanyForm,
  UpdateCompanyForm,
  CompanySearchParams,
  CompanyAnalytics,
} from "./company";
