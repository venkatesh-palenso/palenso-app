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
};

// media endpoint
export const UPLOAD_MEDIA = "/api/upload";

// user endpoints
export const USER_ENDPOINTS = {
  GET_CURRENT_USER: "/api/users/me",
  PROFILE_INFO: (userId: string) => `/api/users/${userId}/profile`,
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
};

// job endpoints
export const JOB_ENDPOINTS = {
  LIST_CREATE_JOB: "/api/jobs",
  JOB_DETAIL: (jobId: string) => `/api/jobs/${jobId}`,
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
