import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_SHORTLISTED_CANDIDATES_API, GET_TALENTS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { GetShortlistedQuery, GetTalentsQuery, RemoveShortlistedParams, ShortlistCandidateParams } from "@/types/applicants";

export const getTalents = async (query: GetTalentsQuery) => {
  const res = await axiosUserInstance.get(`${GET_TALENTS_API}${createQueryString(query)}`);
  return res.data;
};

export const getTalent = async (id: string) => {
  const res = await axiosUserInstance.get(`${GET_TALENTS_API}/${id}`);
  return res.data;
};

export const getShortlisted = async (query: GetShortlistedQuery) => {
  const res = await axiosUserInstance.get(`${GET_SHORTLISTED_CANDIDATES_API}${createQueryString(query)}`);
  return res.data;
};

export const shortlistCandidate = async (data: ShortlistCandidateParams) => {
  const res = await axiosUserInstance.post(GET_SHORTLISTED_CANDIDATES_API, data);
  return res.data;
};

export const removeShortlisted = async (data: RemoveShortlistedParams) => {
  const res = await axiosUserInstance.delete(`${GET_SHORTLISTED_CANDIDATES_API}/${data?.user_id}?job_id=${data?.job_id}`);
  return res.data;
};