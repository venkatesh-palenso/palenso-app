// lib/axios.ts
import axios from "axios";

const API_SERVER = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
  timeoutErrorMessage: "Request timed out. Please try again.",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add request logging or modify headers here
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Don't log or handle errors for cancelled requests
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // In development, suppress network errors to avoid console spam
    if (process.env.NODE_ENV === 'development') {
      // Only log critical errors in development, not network connection issues
      if (error.response && error.response.status >= 500) {
        console.warn("Server error:", error.response.status);
      }
      // Don't log network connection errors in development
      if (error.code === 'ERR_NETWORK') {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }

    // Silently handle network errors without creating new error messages
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      console.warn("Request timeout");
      return Promise.reject(error);
    }

    if (error.code === "ERR_NETWORK" && !error.response) {
      console.warn("Network connection error");
      return Promise.reject(error);
    }

    // Handle HTTP status errors silently
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          console.warn("Unauthorized access");
          break;
        case 403:
          console.warn("Access forbidden");
          break;
        case 404:
          console.warn("Resource not found");
          break;
        case 500:
          console.warn("Server error");
          break;
        default:
          console.warn(`HTTP ${status} error`);
          break;
      }
    }

    // Always pass through the original error without modification
    return Promise.reject(error);
  }
);

export default axiosInstance;
