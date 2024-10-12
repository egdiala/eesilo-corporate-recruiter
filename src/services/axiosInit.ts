import { axiosJobInstance, axiosUserInstance } from "./axiosInstance";

export function axiosInit(token: string) {
    axiosUserInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosUserInstance.defaults.withCredentials = true;
    axiosJobInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}