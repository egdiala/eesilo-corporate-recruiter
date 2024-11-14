import { useQuery } from "@tanstack/react-query";
import type { GetDocumentQuery, GetShortlistedQuery, GetTalentsQuery } from "@/types/applicants";
import { GET_APPLICANT_DOCUMENT, GET_SHORTLISTED, GET_SHORTLISTED_CANDIDATE, GET_TALENT, GET_TALENTS } from "@/constants/queryKeys";
import { getApplicantDocument, getShortlisted, getShortlistedCandidate, getTalent, getTalents } from "@/services/apis/applicants";

export const useGetShortlisted = <T>(query: GetShortlistedQuery) => {
    return useQuery({
        queryKey: [GET_SHORTLISTED, query],
        queryFn: () => getShortlisted(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetShortlistedCandidate = <T>(query: GetShortlistedQuery & { talentId: string }) => {
    return useQuery({
        enabled: !!query.talentId,
        queryKey: [GET_SHORTLISTED_CANDIDATE, query],
        queryFn: () => getShortlistedCandidate(query),
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
        queryKey: [GET_TALENT],
        queryFn: () => getTalent(id),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useGetApplicantDocument = <T>(query: GetDocumentQuery) => {
    return useQuery({
        enabled: !!query.user_id,
        queryKey: [GET_APPLICANT_DOCUMENT, query],
        queryFn: () => getApplicantDocument(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};