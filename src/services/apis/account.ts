import { axiosUserInstance } from "@/services/axiosInstance";
import { CREATE_STAFF_ADMIN_API, GET_ACCOUNT_API, GET_EVENT_CALENDAR_API, UPLOAD_LOGO_API } from "@/constants/api";
import type { CreateStaffParams, GetCalendarEventQuery, UpdateAccountParams } from "@/types/account";
import { createQueryString } from "@/utils/createQuery";

export const updateAccount = async (data: UpdateAccountParams) => {
  const res = await axiosUserInstance.put(GET_ACCOUNT_API, data);
  return res.data;
};

export const getAccount = async () => {
  const res = await axiosUserInstance.get(GET_ACCOUNT_API);
  return res.data;
};

export const getEventCalendar = async (query: GetCalendarEventQuery) => {
  const res = await axiosUserInstance.get(`${GET_EVENT_CALENDAR_API}${createQueryString(query)}`);
  return res.data;
};

export const uploadLogo = async (payload: FormData) => {
  const res = await axiosUserInstance.post(UPLOAD_LOGO_API, payload, {
    headers: {
      "Accept": "application/form-data",
      "Content-Type": "multipart/form-data"
    },
  });
  return res.data;
};

export const createStaffAdmin = async (payload: CreateStaffParams) => {
  const res = await axiosUserInstance.post(CREATE_STAFF_ADMIN_API, payload);
  return res.data;
};

export const updateStaffAdmin = async (payload: Partial<CreateStaffParams> & { user_id: string; }) => {
  const { user_id, ...rest } = payload
  const res = await axiosUserInstance.put(`${CREATE_STAFF_ADMIN_API}/${user_id}`, rest);
  return res.data;
};

export const getStaffAdmins = async () => {
  const res = await axiosUserInstance.get(CREATE_STAFF_ADMIN_API);
  return res.data;
};

export const getStaffAdmin = async (user_id: string) => {
  const res = await axiosUserInstance.get(`${CREATE_STAFF_ADMIN_API}/${user_id}`);
  return res.data;
};

export const deleteStaffAdmin = async (user_id: string) => {
  const res = await axiosUserInstance.delete(`${CREATE_STAFF_ADMIN_API}/${user_id}`);
  return res.data;
};