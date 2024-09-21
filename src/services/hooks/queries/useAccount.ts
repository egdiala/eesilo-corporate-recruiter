import { useQuery } from "@tanstack/react-query";
import { getAccount, getEventCalendar, getStaffAdmin, getStaffAdmins } from "@/services/apis/account";
import { GET_ACCOUNT, GET_EVENT_CALENDAR, GET_STAFF_ADMIN, GET_STAFF_ADMINS } from "@/constants/queryKeys";
import type { FetchedAccount, FetchedCalendarEvent, GetCalendarEventQuery } from "@/types/account";
import { FetchedStaffAdmin } from "@/types/settings";

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
        select: (res) => res?.data as FetchedCalendarEvent[],
        retry: false,
    });
};

export const useGetStaffAdmins = () => {
    return useQuery({
        queryKey: [GET_STAFF_ADMINS],
        queryFn: getStaffAdmins,
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedStaffAdmin[],
        retry: false,
    });
};

export const useGetStaffAdmin = (user_id: string) => {
    return useQuery({
        queryKey: [GET_STAFF_ADMIN, user_id],
        queryFn: () => getStaffAdmin(user_id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as any,
        retry: false,
    });
};