// base service
import APIService from "./api.service";

// endpoints
import { AUTH_ENDPOINTS } from "@/constants/endpoints";

// interfaces
import {
  AuthResponse,
  AvailabilityResponse,
  CheckAvailabilityForm,
  CompleteUserRegistrationForm,
  CreateUserForm,
  CreateUserResponse,
  ForgotPasswordData,
  LoginForm,
  RequestEmailCodeForm,
  RequestMobileCodeForm,
  ResetPasswordData,
  VerificationRequestResponse,
  VerifyEmailForm,
  VerifyMobileForm,
} from "@/interfaces/auth";
import axios from "axios";

class AuthService extends APIService {
  /**
   * Checks the availability of an email for verification.
   *
   * Sends a POST request to the authentication endpoint to verify if the provided email
   * is available for use. Returns a promise that resolves with the availability response.
   *
   * @param email - The form data containing the email to check for availability.
   * @returns A promise that resolves to an `AvailabilityResponse` object.
   * @throws Throws an error if the request fails.
   */
  emailAvailabilty(email: CheckAvailabilityForm) {
    return this.post(AUTH_ENDPOINTS.CHECK_AVAILABILITY, { email })
      .then((response: { data: AvailabilityResponse }) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Checks the availability of an mobile for verification.
   *
   * Sends a POST request to the authentication endpoint to verify if the provided mobile
   * is available for use. Returns a promise that resolves with the availability response.
   *
   * @param mobile_number - The form data containing the mobile_number to check for availability.
   * @returns A promise that resolves to an `AvailabilityResponse` object.
   * @throws Throws an error if the request fails.
   */
  mobileAvailabilty(mobile_number: CheckAvailabilityForm) {
    return this.post(AUTH_ENDPOINTS.CHECK_AVAILABILITY, { mobile_number })
      .then((response: { data: AvailabilityResponse }) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Logs in a user with the provided credentials.
   * @param data - The login form data containing email and password.
   * @returns A promise that resolves to the user object on successful login.
   */
  login(data: LoginForm) {
    return this.post(AUTH_ENDPOINTS.USER_LOGIN, data)
      .then((response: { data: AuthResponse }) => {
        const { user, access_token, refresh_token } = response.data;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        return user;
      })
      .catch((error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data
          : "Something went wrong!";
        throw message?.error || "Something went wrong!";
      });
  }

  /**
   * Creates a new user with the provided form data.
   * @param data - The form data for creating a new user.
   * @returns A promise that resolves to the created user object.
   */
  createUser(data: CreateUserForm) {
    return this.post(AUTH_ENDPOINTS.USER_SIGNUP, data)
      .then((response: { data: CreateUserResponse }) => {
        const { user } = response.data;
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Requests an email verification code for the user.
   * @param data - The form data containing user ID and email.
   * @returns A promise that resolves to a message indicating success.
   */
  requestEmailCode(data: RequestEmailCodeForm) {
    return this.post(AUTH_ENDPOINTS.REQUEST_CODE, data)
      .then((response: { data: VerificationRequestResponse }) => {
        return response.data.message;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Requests a mobile verification code for the user.
   * @param data - The form data containing user ID and mobile number.
   * @returns A promise that resolves to a message indicating success.
   */
  requestMobileCode(data: RequestMobileCodeForm) {
    return this.post(AUTH_ENDPOINTS.REQUEST_CODE, data)
      .then((response: { data: VerificationRequestResponse }) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Verifies the email code by sending the provided verification form data to the server.
   *
   * @param data - The form data containing the email verification code and related information.
   * @returns A promise that resolves to a message string from the verification response.
   * @throws Throws an error if the verification request fails.
   */
  verifyEmailCode(data: VerifyEmailForm) {
    return this.post(AUTH_ENDPOINTS.VERIFY_EMAIL, data)
      .then((response: { data: VerificationRequestResponse }) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Verifies a mobile code by sending the provided verification form data to the server.
   *
   * @param data - The verification form data containing the mobile code and related information.
   * @returns A promise that resolves with the verification message from the server.
   * @throws Will throw an error if the verification request fails.
   */
  verifyMobileCode(data: VerifyMobileForm) {
    return this.post(AUTH_ENDPOINTS.VERIFY_MOBILE, data)
      .then((response: { data: VerificationRequestResponse }) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Completes the user registration process by setting the password.
   * @param data - The form data containing user ID, password, and confirmation password.
   * @returns A promise that resolves to the user object after successful registration.
   */
  completeUserRegistration(data: CompleteUserRegistrationForm) {
    return this.put(AUTH_ENDPOINTS.USER_SIGNUP, data)
      .then((response: { data: AuthResponse }) => {
        const { user, access_token, refresh_token } = response.data;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Logs out the current user by sending a POST request to the logout endpoint.
   *
   * @returns {Promise<unknown>} A promise that resolves with the response data on success.
   * @throws Will throw the error response data if the request fails.
   */
  logout() {
    return this.post(AUTH_ENDPOINTS.USER_LOGOUT, {})
      .then((response: { data: unknown }) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Sends a forgot password request to the authentication endpoint.
   *
   * @param data - The data required for the forgot password request.
   * @returns A promise that resolves with the response data from the server.
   * @throws Throws the error response data if the request fails.
   */
  forgotPassword(data: ForgotPasswordData) {
    return this.post(AUTH_ENDPOINTS.USER_FORGOT_PASSWORD, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Sends a request to reset the user's password.
   *
   * @param data - The data required to reset the password.
   * @returns A promise that resolves with the response data if successful.
   * @throws Throws the error response data if the request fails.
   */
  resetPassword(data: ResetPasswordData) {
    return this.post(AUTH_ENDPOINTS.USER_RESET_PASSWORD, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default AuthService;
