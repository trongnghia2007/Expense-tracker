import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      // Gắn token vào header Authorization
      config.headers.Authorization = `Bearer ${accessToken}`; // <-- Sửa cú pháp
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // ✅ If the response is successful (status code 2xx), just return it
    return response;
  },
  (error) => {
    // ❌ If an error response is received from the server
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // 🔑 401 Unauthorized → token is invalid or expired
        console.warn("Unauthorized. Redirecting to login...");
        window.location.href = "/login"; // Redirect user to login page
      } 
      else if (status === 500) {
        // 💥 500 Internal Server Error → problem on the server
        console.error("Server error. Please try again later.");
      }
    } 
    // ⏳ Handle request timeout
    else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    // ❗ Always reject the error so the calling function can handle it
    return Promise.reject(error);
  }
);


export default axiosInstance;
