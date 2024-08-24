import { useQuery } from "@tanstack/react-query";
import { GET_JOBS } from "@/constants/queryKeys";
import { getJobs } from "@/services/apis/jobs";

export const useGetJobs = () => {
    return useQuery({
        queryKey: [GET_JOBS],
        queryFn: getJobs,
        select: (res) => res?.data as any[],
        retry: false,
    });
};