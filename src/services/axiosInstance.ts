import axios, { AxiosInstance } from "axios";
import { axiosInit } from "./axiosInit";

export const axiosUserInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEESILO_USER_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosJobInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NEESILO_JOB_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") as string;

if (token) {
  axiosInit(token)
}