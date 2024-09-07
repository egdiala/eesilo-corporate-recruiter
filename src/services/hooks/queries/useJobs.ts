import { useQuery } from "@tanstack/react-query";
import { GET_JOB_REQUIREMENTS, GET_JOBS } from "@/constants/queryKeys";
import { getJob, getJobRequirements, getJobs } from "@/services/apis/jobs";
import type { FetchedJob, FetchJobRequirementsParams } from "@/types/jobs";

export const useGetJobs = () => {
    return useQuery({
        queryKey: [GET_JOBS],
        queryFn: getJobs,
        select: (res) => res?.data as FetchedJob[],
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetJob = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_JOBS, id],
        queryFn: () => getJob(id),
        select: (res) => res?.data as FetchedJob,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetJobRequirements = (query: FetchJobRequirementsParams) => {
    return useQuery({
        enabled: !!query.q,
        queryKey: [GET_JOB_REQUIREMENTS, query],
        queryFn: () => getJobRequirements(query),
        select: (res) => res?.data as Array<{ requirement: string; }>,
        retry: false,
        refetchOnWindowFocus: false,
    });
};