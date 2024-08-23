import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/apis/account";
import { GET_ACCOUNT } from "@/constants/queryKeys";
import { User } from "@/types/auth";

export const useGetAccount = () => {
    return useQuery({
        queryKey: [GET_ACCOUNT],
        queryFn: getAccount,
        refetchOnWindowFocus: true,
        select: (res) => res?.data as User,
        retry: false,
    });
};