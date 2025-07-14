import { AUTH_ENDPOINTS } from '@/constants/endpoints';
import { BaseService, ApiResponse, RequestConfig } from './base.service';

// Types for authentication
export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  role: 'student' | 'employer';
}

export interface CompleteUserRegistrationData {
  user_id: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface VerifyMobileData {
  mobile_number: string;
  otp: string;
}

export interface SendOTPData {
  email?: string;
  phoneNumber?: string;
}

export interface CheckAvailabilityData {
  email?: string;
  phoneNumber?: string;
}

export interface SSOLoginData {
  provider: 'google' | 'facebook' | 'linkedin';
  accessToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    role: 'student' | 'employer';
    last_active: string;
    date_joined: string;
    is_active: boolean;
    is_email_verified: boolean;
    is_mobile_verified: boolean;
  };
  access_token?: string;
  refresh_token?: string;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  sessionId: string;
}

export interface AvailabilityResponse {
  available: boolean;
  message: string;
  exists?: boolean;
}

export interface SendVerificationResponse {
  success: boolean;
  message: string;
}

export interface mobileVerificationData {
  user_id: string;
  mobile_number: string;
}

export class AuthService extends BaseService {
  constructor(
    baseURL: string 
  ) {
    super(baseURL);
  }

  /**
   * Check email availability
   */
  async checkEmailAvailability(
    email: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AvailabilityResponse>> {
    return this.post<AvailabilityResponse>(
      AUTH_ENDPOINTS.CHECK_AVAILABILITY,
      { email },
      config
    );
  }

  /**
   * Check phone availability
   */
  async checkPhoneAvailability(
    phoneNumber: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AvailabilityResponse>> {
    return this.post<AvailabilityResponse>(
      AUTH_ENDPOINTS.CHECK_AVAILABILITY,
      { mobile_number: phoneNumber },
      config
    );
  }

  /**
   * Send verification codes to both email and phone
   */
  async sendEmailVerification(
    email: string,
    config?: RequestConfig
  ): Promise<ApiResponse<SendVerificationResponse>> {
    return this.post<SendVerificationResponse>(
      AUTH_ENDPOINTS.SEND_VERIFICATION,
      { email },
      config
    );
  }

  /**
   * Send verification codes to both email and phone
   */
  async sendMobileVerification(
    data: mobileVerificationData,
    config?: RequestConfig
  ): Promise<ApiResponse<SendVerificationResponse>> {
    return this.post<SendVerificationResponse>(
      AUTH_ENDPOINTS.SEND_VERIFICATION,
      data,
      config
    );
  }

  /**
   * Verify email with OTP
   */
  async verifyEmail(
    data: VerifyEmailData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.VERIFY_EMAIL, data, config);
  }

  /**
   * Verify mobile with OTP
   */
  async verifyMobile(
    data: VerifyMobileData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.VERIFY_MOBILE, data, config);
  }

  /**
   * Create User
   */
  async createUser(
    data: CreateUserData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_SIGNUP, data, config);
  }

  /**
   * Complete User Registration
   */
  async completeUserRegistration(
    data: CompleteUserRegistrationData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.put<AuthResponse>(AUTH_ENDPOINTS.USER_SIGNUP, data, config);
  }

  /**
   * User login
   */
  async login(
    data: LoginData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_LOGIN, data, config);
  }

  /**
   * SSO login
   */
  async ssoLogin(
    data: SSOLoginData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(
      `/auth/${data.provider}`,
      { accessToken: data.accessToken },
      config
    );
  }

  /**
   * Forgot password
   */
  async forgotPassword(
    data: ForgotPasswordData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_FORGOT_PASSWORD, data, config);
  }

  /**
   * Reset password
   */
  async resetPassword(
    data: ResetPasswordData,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_RESET_PASSWORD, data, config);
  }

  /**
   * Resend email OTP
   */
  async resendEmailOTP(
    data: SendOTPData,
    config?: RequestConfig
  ): Promise<ApiResponse<OTPResponse>> {
    return this.post<OTPResponse>(AUTH_ENDPOINTS.USER_RESEND_EMAIL_OTP, data, config);
  }

  /**
   * Resend mobile OTP
   */
  async resendMobileOTP(
    data: SendOTPData,
    config?: RequestConfig
  ): Promise<ApiResponse<OTPResponse>> {
    return this.post<OTPResponse>(AUTH_ENDPOINTS.USER_RESEND_MOBILE_OTP, data, config);
  }

  /**
   * Refresh token
   */
  async refreshToken(
    refreshToken: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(
      AUTH_ENDPOINTS.USER_REFRESH_TOKEN,
      { refreshToken },
      config
    );
  }

  /**
   * Logout
   */
  async logout(config?: RequestConfig): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_LOGOUT, {}, config);
  }

  /**
   * Get current user profile
   */
  async getProfile(config?: RequestConfig): Promise<ApiResponse<AuthResponse>> {
    return this.get<AuthResponse>(AUTH_ENDPOINTS.USER_GET_PROFILE, config);
  }

  /**
   * Change password
   */
  async changePassword(
    data: { currentPassword: string; newPassword: string },
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(AUTH_ENDPOINTS.USER_CHANGE_PASSWORD, data, config);
  }

  /**
   * Delete account
   */
  async deleteAccount(
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.delete<AuthResponse>(AUTH_ENDPOINTS.USER_DELETE_ACCOUNT, config);
  }

  /**
   * Google OAuth login
   */
  async googleLogin(
    accessToken: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/google', { accessToken }, config);
  }

  /**
   * Facebook OAuth login
   */
  async facebookLogin(
    accessToken: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/facebook', { accessToken }, config);
  }

  /**
   * LinkedIn OAuth login
   */
  async linkedinLogin(
    accessToken: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/linkedin', { accessToken }, config);
  }

  /**
   * Verify email link
   */
  async verifyEmailLink(
    token: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(
      '/auth/verify-email-link',
      { token },
      config
    );
  }

  /**
   * Verify reset password link
   */
  async verifyResetPasswordLink(
    token: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(
      '/auth/verify-reset-password-link',
      { token },
      config
    );
  }

  /**
   * Get user sessions
   */
  async getUserSessions(
    config?: RequestConfig
  ): Promise<ApiResponse<{ sessions: any[] }>> {
    return this.get<{ sessions: any[] }>('/auth/sessions', config);
  }

  /**
   * Revoke session
   */
  async revokeSession(
    sessionId: string,
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.delete<AuthResponse>(`/auth/sessions/${sessionId}`, config);
  }

  /**
   * Revoke all sessions
   */
  async revokeAllSessions(
    config?: RequestConfig
  ): Promise<ApiResponse<AuthResponse>> {
    return this.delete<AuthResponse>('/auth/sessions', config);
  }
}
