import { useQuery } from "@tanstack/react-query";
import { GET_DASHBOARD_STATS } from "@/constants/queryKeys";
import { getDashboardStats } from "@/services/apis/dashboard";
import type { GetDashboardStatsQuery } from "@/types/dashboard";

export const useGetDashboardStats = <T>(query: GetDashboardStatsQuery) => {
    return useQuery({
        queryKey: [GET_DASHBOARD_STATS, query],
        queryFn: () => getDashboardStats(query),
        select: (res) => res?.data as T,
        retry: false,
    });
};