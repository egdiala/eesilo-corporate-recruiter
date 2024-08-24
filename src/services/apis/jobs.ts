import { axiosJobInstance } from "@/services/axiosInstance";
import { GET_JOBS_API } from "@/constants/api";

export const getJobs = async () => {
  const res = await axiosJobInstance.get(GET_JOBS_API);
  return res.data;
};