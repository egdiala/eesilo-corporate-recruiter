import { axiosJobInstance } from "@/services/axiosInstance";
import { GET_JOBS_API } from "@/constants/api";
import type { CreateJobParams } from "@/types/jobs";

export const getJobs = async () => {
  const res = await axiosJobInstance.get(GET_JOBS_API);
  return res.data;
};

export const createJob = async (payload: CreateJobParams) => {
  const res = await axiosJobInstance.post(GET_JOBS_API, payload);
  return res.data;
};