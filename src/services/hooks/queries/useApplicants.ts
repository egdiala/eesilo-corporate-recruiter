import { useQuery } from "@tanstack/react-query";
import { GET_SHORTLISTED, GET_TALENTS } from "@/constants/queryKeys";
import { getApplicantDocument, getShortlisted, getTalent, getTalents } from "@/services/apis/applicants";
import type { GetDocumentQuery, GetShortlistedQuery, GetTalentsQuery } from "@/types/applicants";

export const useGetShortlisted = <T>(query: GetShortlistedQuery) => {
    return useQuery({
        queryKey: [GET_SHORTLISTED, query],
        queryFn: () => getShortlisted(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetTalents = <T>(query: GetTalentsQuery) => {
    return useQuery({
        queryKey: [GET_TALENTS, query],
        queryFn: () => getTalents(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetTalent = <T>(id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_TALENTS],
        queryFn: () => getTalent(id),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetApplicantDocument = <T>(query: GetDocumentQuery) => {
    return useQuery({
        enabled: !!query.user_id,
        queryKey: [GET_TALENTS, query],
        queryFn: () => getApplicantDocument(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};