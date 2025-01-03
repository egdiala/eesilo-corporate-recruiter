import { axiosUserInstance } from "@/services/axiosInstance";
import { CARDS_API, GET_SUBSCRIPTION_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { CompleteSubscriptionParams, GetSavedCardQuery, GetSubscriptionQuery, InitSaveCardParams, InitSubscriptionParams } from "@/types/subscription";

export const getSubscription = async (query: GetSubscriptionQuery) => {
  const res = await axiosUserInstance.get(`${GET_SUBSCRIPTION_API}${createQueryString(query)}`);
  return res.data;
};

export const initSubscription = async (payload: InitSubscriptionParams) => {
  const res = await axiosUserInstance.post(GET_SUBSCRIPTION_API, payload);
  return res.data;
};

export const completeSubscription = async (payload: CompleteSubscriptionParams) => {
  const res = await axiosUserInstance.put(GET_SUBSCRIPTION_API, payload);
  return res.data;
};

export const initSaveCard = async (payload: InitSaveCardParams) => {
  const res = await axiosUserInstance.post(CARDS_API, payload);
  return res.data;
};

export const getSavedCard = async (query: GetSavedCardQuery) => {
  const res = await axiosUserInstance.get(`${CARDS_API}${createQueryString(query)}`);
  return res.data;
};