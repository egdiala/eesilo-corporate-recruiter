import { useQuery } from "@tanstack/react-query";
import { getAccount, getEventCalendar } from "@/services/apis/account";
import { GET_ACCOUNT, GET_EVENT_CALENDAR } from "@/constants/queryKeys";
import type { FetchedAccount, GetCalendarEventQuery } from "@/types/account";

export const useGetAccount = () => {
    return useQuery({
        queryKey: [GET_ACCOUNT],
        queryFn: getAccount,
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedAccount,
        retry: false,
    });
};

export const useGetEventCalendar = (query: GetCalendarEventQuery) => {
    return useQuery({
        queryKey: [GET_EVENT_CALENDAR, query],
        queryFn: () => getEventCalendar(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as any,
        retry: false,
    });
};