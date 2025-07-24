// auth endpoints
export const AUTH_ENDPOINTS = {
  USER_SIGNUP: "/api/auth/signup",
  USER_LOGIN: "/api/auth/signin",
  USER_LOGOUT: "/api/auth/signout",
  USER_FORGOT_PASSWORD: "/api/auth/forgot-password",
  USER_RESET_PASSWORD: "/api/auth/reset-password",
  USER_CHANGE_PASSWORD: "/api/auth/change-password",
  CHECK_MEDIUM_AVAILABILITY: "/api/auth/check-medium-availability",
  REQUEST_MEDIUM_VERIFICATION: "/api/auth/request-medium-verification",
  VERIFY_MEDIUM: "/api/auth/verify-medium",
  CHECK_USER_EXISTENCE: "/api/auth/check-user-existence",
};

// media endpoint
export const UPLOAD_MEDIA = "/api/upload";

// user endpoints
export const USER_ENDPOINTS = {
  GET_CURRENT_USER: "/api/users/me",
  PROFILE_INFO: (userId: string) => `/api/users/${userId}/profile`,
  LIST_USERS: "/api/users",
  USER_DETAIL: (userId: string) => `/api/users/${userId}`,
  BULK_UPDATE_USERS: "/api/users/bulk-update",
};

// company endpoints
export const COMPANY_ENDPOINTS = {
  LIST_CREATE_COMPANY: "/api/companies",
  COMPANY_DETAIL: (companyId: string) => `/api/companies/${companyId}`,
};

// event endpoints
export const EVENT_ENDPOINTS = {
  LIST_CREATE_EVENT: "/api/events",
  EVENT_DETAIL: (eventId: string) => `/api/events/${eventId}`,
  EVENT_REGISTRATIONS: `/api/event-registrations`,
  EVENT_REGISTRATION_DETAIL: (eventId: string) =>
    `/api/event-registrations/${eventId}`,
};

// job endpoints
export const JOB_ENDPOINTS = {
  LIST_CREATE_JOB: "/api/jobs",
  JOB_DETAIL: (jobId: string) => `/api/jobs/${jobId}`,
  JOB_APPLICATIONS: (jobId: string) => `/api/jobs/${jobId}/applications`,
  APPLY_FOR_JOB: (jobId: string) => `/api/jobs/${jobId}/apply`,
  SAVED_JOBS: "/api/saved-jobs",
  SAVE_JOB: (jobId: string) => `/api/saved-jobs/${jobId}`,
  UNSAVE_JOB: (jobId: string) => `/api/saved-jobs/${jobId}`,
  MY_APPLICATIONS: "/api/applications",
  APPLICATION_DETAIL: (applicationId: string) =>
    `/api/applications/${applicationId}`,
  UPDATE_APPLICATION: (applicationId: string) =>
    `/api/applications/${applicationId}`,
  WITHDRAW_APPLICATION: (applicationId: string) =>
    `/api/applications/${applicationId}/withdraw`,
};

// profile endpoints
export const PROFILE_ITEMS_ENDPOINTS = {
  LIST_CREATE_EXPERIENCES: `/api/work-experiences`,
  LIST_CREATE_EDUCATIONS: `/api/educations`,
  LIST_CREATE_PROJECTS: `/api/projects`,
  LIST_CREATE_SKILLS: `/api/skills`,
  LIST_CREATE_RESUMES: `/api/resumes`,
  LIST_CREATE_INTERESTS: `/api/interests`,
  EXPERIENCE_INFO: (experienceId: string) =>
    `/api/work-experiences/${experienceId}`,
  EDUCATION_INFO: (educationId: string) => `/api/educations/${educationId}`,
  PROJECT_INFO: (projectId: string) => `/api/projects/${projectId}`,
  SKILL_INFO: (skillId: string) => `/api/skills/${skillId}`,
  RESUME_INFO: (resumeId: string) => `/api/resumes/${resumeId}`,
  INTEREST_INFO: (interestId: string) => `/api/interests/${interestId}`,
};

// analytics endpoints
export const DASHBOARD_ENDPOINTS = {
  DASHBOARD_ANALYTICS: "/api/dashboard-analytics",
  DASHBOARD_INFO: "/api/dashboard-info",
};
