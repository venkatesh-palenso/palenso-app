// auth endpoints
export const AUTH_ENDPOINTS = {
  CHECK_AVAILABILITY: '/api/auth/check-availability',
  REQUEST_CODE: '/api/auth/send-verification',
  VERIFY_EMAIL: '/api/auth/verify-email',
  VERIFY_MOBILE: '/api/auth/verify-mobile',
  USER_SIGNUP: '/api/auth/signup',
  USER_LOGIN: '/api/auth/sign-in',
  USER_LOGOUT: '/api/auth/logout',
  USER_FORGOT_PASSWORD: '/api/auth/forgot-password',
  USER_RESET_PASSWORD: '/api/auth/reset-password',
};

// user endpoints
export const USER_ENDPOINTS = {
  GET_CURRENT_USER: '/api/users/me',
  UPDATE_CURRENT_USER: '/api/user/update-current-user',
  GET_USER_BY_ID: '/api/user/get-user-by-id',
  GET_USERS: '/api/user/get-users',
  UPLOAD_AVATAR: '/api/user/upload-avatar',
  DELETE_AVATAR: '/api/user/delete-avatar',
};

// company endpoints
export const COMPANY_ENDPOINTS = {
  GET_COMPANY_BY_ID: '/api/company/get-company-by-id',
  GET_COMPANIES: '/api/company/get-companies',
  CREATE_COMPANY: '/api/company/create-company',
  UPDATE_COMPANY: '/api/company/update-company',
  DELETE_COMPANY: '/api/company/delete-company',
};

// job endpoints
