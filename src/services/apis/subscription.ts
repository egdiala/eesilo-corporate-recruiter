import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_SUBSCRIPTION_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getSubscription = async (query: any) => {
  const res = await axiosUserInstance.get(`${GET_SUBSCRIPTION_API}${createQueryString(query)}`);
  return res.data;
};