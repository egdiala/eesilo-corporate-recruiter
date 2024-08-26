import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_JOBS_API } from "@/constants/api";
import type { CreateJobParams } from "@/types/jobs";

export const getJobs = async () => {
  const res = await axiosUserInstance.get(GET_JOBS_API);
  return res.data;
};

export const getJob = async (id: string) => {
  const res = await axiosUserInstance.get(`${GET_JOBS_API}/${id}`);
  return res.data;
};

export const createJob = async (payload: CreateJobParams) => {
  const res = await axiosUserInstance.post(GET_JOBS_API, payload);
  return res.data;
};

export const updateJob = async (payload: CreateJobParams & { jobId: string; }) => {
  const { jobId, ...rest } = payload
  const res = await axiosUserInstance.put(`${GET_JOBS_API}/${jobId}`, rest);
  return res.data;
};