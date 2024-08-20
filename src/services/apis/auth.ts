import type { LoginType } from "@/types/auth";
import { axiosUserInstance } from "@/services/axiosInstance";
import { CONFIRM_REGISTER_LINK_API, FORGOT_PASSWORD_API, LOGIN_API, REGISTER_API, SET_PASSWORD_LINK_API } from "@/constants/api";

export const login = async (data: LoginType) => {
  const res = await axiosUserInstance.post(LOGIN_API, data);
  return res.data;
};

export const register = async (data: Partial<LoginType>) => {
  const res = await axiosUserInstance.post(REGISTER_API, data);
  return res.data;
};

export const confirmRegistrationLink = async (data: { link: string; }) => {
  const res = await axiosUserInstance.post(CONFIRM_REGISTER_LINK_API, data);
  return res.data;
};

export const setPassword = async (data: Partial<LoginType> & { link: string; }) => {
  const res = await axiosUserInstance.post(SET_PASSWORD_LINK_API, data);
  return res.data;
};

export const forgotPassword = async (data: Partial<LoginType>) => {
  const res = await axiosUserInstance.post(FORGOT_PASSWORD_API, data);
  return res.data;
};