import { axiosUserInstance } from "@/services/axiosInstance";
import { GET_DASHBOARD_STATS_API } from "@/constants/api";
import type { GetDashboardStatsQuery } from "@/types/dashboard";
import { createQueryString } from "@/utils/createQuery";

export const getDashboardStats = async (query: GetDashboardStatsQuery) => {
  const res = await axiosUserInstance.get(`${GET_DASHBOARD_STATS_API}${createQueryString(query)}`);
  return res.data;
};