import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";
import { useLogout } from "./hooks/mutations";
import { useEffect } from "react";

export const axiosUserInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEESILO_USER_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const useAxiosInterceptor = () => {
  const logoutMutation = useLogout(() => {
    localStorage.clear()
    sessionStorage.clear();
    // Optionally, redirect user after logout
    window.location.href = "/auth/login";
  });

  useEffect(() => {
    const interceptor = axiosUserInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Trigger the logout mutation if a 401 occurs
          logoutMutation.mutate();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosUserInstance.interceptors.response.eject(interceptor);
    };
  }, [logoutMutation]);

  return axiosUserInstance;
};

const token = localStorage.getItem("token") as string;

if (token) {
  axiosInit(token)
}