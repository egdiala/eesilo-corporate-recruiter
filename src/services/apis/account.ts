import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_ACCOUNT_API, GET_EVENT_CALENDAR_API, UPLOAD_LOGO_API } from "@/constants/api";
import type { GetCalendarEventQuery, UpdateAccountParams } from "@/types/account";
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