import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_SHORTLISTED_CANDIDATES_API, GET_TALENTS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { GetShortlistedQuery, GetTalentsQuery } from "@/types/applicants";

export const getTalents = async (query: GetTalentsQuery) => {
  const res = await axiosUserInstance.get(`${GET_TALENTS_API}${createQueryString(query)}`);
  return res.data;
};

export const getShortlisted = async (query: GetShortlistedQuery) => {
  const res = await axiosUserInstance.get(`${GET_SHORTLISTED_CANDIDATES_API}${createQueryString(query)}`);
  return res.data;
};