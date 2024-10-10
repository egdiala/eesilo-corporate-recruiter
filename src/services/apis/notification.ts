import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_NOTIFICATIONS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { GetNotificationQuery } from "@/types/notification";

export const getNotifications = async (query: GetNotificationQuery) => {
  const res = await axiosUserInstance.get(`${GET_NOTIFICATIONS_API}${createQueryString(query)}`);
  return res.data;
};