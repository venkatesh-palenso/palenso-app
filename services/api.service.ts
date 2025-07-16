// axios
import { AxiosPromise } from "axios";

// js-cookie
import cookie from "js-cookie";

// moment
import Moment from "moment";

// axios config
import axiosInstance from "@/config/axios.config";

/**
 * Abstract class providing common API service methods for HTTP requests and authentication token management.
 *
 * @remarks
 * This class encapsulates methods for handling access and refresh tokens via cookies,
 * and provides wrappers for HTTP requests using Axios, including support for multipart file uploads.
 * Extend this class to implement specific API service logic.
 *
 *
 * @method setAccessToken - Stores the access token in cookies with expiry.
 * @method getAccessToken - Retrieves the access token from cookies.
 * @method setRefreshToken - Stores the refresh token in cookies with expiry.
 * @method purgeAuth - Removes all authentication-related cookies.
 * @method get - Performs a GET request with authorization headers.
 * @method post - Performs a POST request with authorization headers.
 * @method update - Performs a PUT request with authorization headers.
 * @method put - Performs a PUT request with authorization headers.
 * @method patch - Performs a PATCH request with authorization headers.
 * @method delete - Performs a DELETE request with authorization headers.
 * @method upload - Uploads files using multipart/form-data.
 */
abstract class APIService {
  private date = new Date();
  private expiry = Moment(this.date).add(7, "days");

  private getAxiosHeaders() {
    const token = cookie.get("token");
    return token
      ? {
          Authorization: token ? `Bearer ${token}` : "",
        }
      : {};
  }

  setAccessToken(token: string): void {
    cookie.set("token", token, { expires: this.expiry.toDate() });
  }

  getAccessToken(): string | undefined {
    return cookie.get("token");
  }

  setRefreshToken(token: string): void {
    cookie.set("refreshToken", token, { expires: this.expiry.toDate() });
  }

  purgeAuth(): void {
    cookie.remove("token");
    cookie.remove("refreshToken");
    cookie.remove("next-auth.callback-url");
    cookie.remove("next-auth.csrf-token");
    cookie.remove("session");
  }

  get(url: string): AxiosPromise {
    return axiosInstance.get(url, {
      headers: this.getAxiosHeaders(),
    });
  }

  post(url: string, data = {}, headers?: unknown): AxiosPromise {
    return axiosInstance.post(url, data, {
      headers: {
        ...this.getAxiosHeaders(),
        ...(headers || {}),
      },
    });
  }

  update(url: string, data = {}, headers?: unknown): AxiosPromise {
    return axiosInstance.put(url, data, {
      headers: {
        ...this.getAxiosHeaders(),
        ...(headers || {}),
      },
    });
  }

  put(url: string, data = {}): AxiosPromise {
    return axiosInstance.put(url, data, {
      headers: this.getAxiosHeaders(),
    });
  }

  patch(url: string, data = {}): AxiosPromise {
    return axiosInstance.patch(url, data, {
      headers: this.getAxiosHeaders(),
    });
  }

  delete(url: string): AxiosPromise {
    return axiosInstance.delete(url, {
      headers: this.getAxiosHeaders(),
    });
  }

  /**
   * Upload media (files) to the server with multipart/form-data
   * @param url API endpoint
   * @param formData FormData containing files and any additional fields
   */
  upload(url: string, formData: FormData): AxiosPromise {
    return axiosInstance.post(url, formData, {
      headers: {
        ...this.getAxiosHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default APIService;
