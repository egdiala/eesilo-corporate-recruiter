import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";

export const axiosUserInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEESILO_USER_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const axiosJobInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEESILO_JOB_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosCountryInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_COUNTRY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-CSCAPI-KEY": import.meta.env.VITE_COUNTRY_API_KEY
  },
});

const token = localStorage.getItem("token") as string;

if (token) {
  axiosInit(token)
}