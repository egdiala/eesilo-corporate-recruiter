import { useQuery } from "@tanstack/react-query";
import { GET_COUNTRIES, GET_STATES_BY_COUNTRY } from "@/constants/queryKeys";
import { getCountries, getStatesByCountry } from "@/services/apis/country";
import type { FetchedCountries, FetchedStatesByCounty } from "@/types/country";

export const useGetCountries = () => {
    return useQuery({
        queryKey: [GET_COUNTRIES],
        queryFn: getCountries,
        refetchOnWindowFocus: false,
        select: ({ data }: { data: FetchedCountries[] }) => data as FetchedCountries[],
        retry: false,
    });
};

export const useGetStatesByCountry = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_STATES_BY_COUNTRY, id],
        queryFn: () => getStatesByCountry(id),
        refetchOnWindowFocus: false,
        select: ({ data }: { data: FetchedStatesByCounty }) => data as FetchedStatesByCounty,
        retry: false,
    });
};