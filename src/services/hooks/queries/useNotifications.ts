import { useQuery } from "@tanstack/react-query";
import { GET_NOTIFICATIONS } from "@/constants/queryKeys";
import { getNotifications } from "@/services/apis/notification";
import type{ GetNotificationQuery } from "@/types/notification";

export const useGetNotifications = <T>(query: GetNotificationQuery) => {
    return useQuery({
        queryKey: [GET_NOTIFICATIONS, query],
        queryFn: () => getNotifications(query),
        select: (res) => res?.data as T,
        retry: false,
        refetchOnWindowFocus: false,
    });
};