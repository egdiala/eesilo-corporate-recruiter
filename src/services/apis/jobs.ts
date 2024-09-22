import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_JOB_REQUIREMENTS_API, GET_JOBS_API } from "@/constants/api";
import type { CreateJobParams, FetchJobRequirementsParams, GetJobsQuery } from "@/types/jobs";
import { createQueryString } from "@/utils/createQuery";

export const getJobs = async (query: GetJobsQuery) => {
  const res = await axiosUserInstance.get(`${GET_JOBS_API}${createQueryString(query)}`);
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

export const getJobRequirements = async (query: FetchJobRequirementsParams) => {
  const res = await axiosUserInstance.get(`${GET_JOB_REQUIREMENTS_API}${createQueryString(query)}`);
  return res.data;
};