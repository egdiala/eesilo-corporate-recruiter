import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/apis/account";
import { GET_ACCOUNT } from "@/constants/queryKeys";
import type { FetchedAccount } from "@/types/account";

export const useGetAccount = () => {
    return useQuery({
        queryKey: [GET_ACCOUNT],
        queryFn: getAccount,
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedAccount,
        retry: false,
    });
};