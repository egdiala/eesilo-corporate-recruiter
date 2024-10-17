import { useQuery } from "@tanstack/react-query";
import { GET_SUBSCRIPTION } from "@/constants/queryKeys";
import { getSubscription } from "@/services/apis/subscription";

export const useGetSubscription = (query: any) => {
    return useQuery({
        queryKey: [GET_SUBSCRIPTION],
        queryFn: () => getSubscription(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as any,
        retry: false,
    });
};