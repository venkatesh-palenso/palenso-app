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

export default axiosInstance;
