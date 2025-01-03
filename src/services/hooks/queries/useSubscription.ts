import { useQuery } from "@tanstack/react-query";
import { GET_SAVED_CARDS, GET_SUBSCRIPTION } from "@/constants/queryKeys";
import { getSavedCard, getSubscription } from "@/services/apis/subscription";
import type { GetSavedCardQuery, GetSubscriptionQuery } from "@/types/subscription";

export const useGetSubscription = <T>(query: GetSubscriptionQuery) => {
    return useQuery({
        queryKey: [GET_SUBSCRIPTION],
        queryFn: () => getSubscription(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as T,
        retry: false,
    });
};

export const useGetSavedCard = <T>(query: GetSavedCardQuery) => {
    return useQuery({
        queryKey: [GET_SAVED_CARDS],
        queryFn: () => getSavedCard(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as T,
        retry: false,
    });
};