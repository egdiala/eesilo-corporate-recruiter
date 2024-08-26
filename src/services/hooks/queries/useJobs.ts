import { useQuery } from "@tanstack/react-query";
import { GET_JOBS } from "@/constants/queryKeys";
import { getJobs } from "@/services/apis/jobs";
import type { FetchedJob } from "@/types/jobs";

export const useGetJobs = () => {
    return useQuery({
        queryKey: [GET_JOBS],
        queryFn: getJobs,
        select: (res) => res?.data as FetchedJob[],
        retry: false,
    });
};