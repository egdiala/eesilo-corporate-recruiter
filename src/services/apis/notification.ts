import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_NOTIFICATIONS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { GetNotificationQuery } from "@/types/notification";

export const getNotifications = async (query: GetNotificationQuery) => {
  const res = await axiosUserInstance.get(`${GET_NOTIFICATIONS_API}${createQueryString(query)}`);
  return res.data;
};

export const readNotifications = async () => {
  const res = await axiosUserInstance.put(GET_NOTIFICATIONS_API);
  return res.data;
};

export const readNotification = async (id: string) => {
  const res = await axiosUserInstance.put(`${GET_NOTIFICATIONS_API}/${id}`);
  return res.data;
};