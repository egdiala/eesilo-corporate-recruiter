import { useQuery } from "@tanstack/react-query";
import { GET_CITIES_BY_STATE_AND_COUNTRY, GET_COUNTRIES, GET_STATES_BY_COUNTRY } from "@/constants/queryKeys";
import { getCitiesByStateAndCountry, getCountries, getStatesByCountry } from "@/services/apis/country";
import type { FetchedCitiesByStateAndCountry, FetchedCountries, FetchedStatesByCounty } from "@/types/country";

export const useGetCountries = () => {
    return useQuery({
        queryKey: [GET_COUNTRIES],
        queryFn: getCountries,
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedCountries[],
        retry: false,
    });
};

export const useGetStatesByCountry = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_STATES_BY_COUNTRY, id],
        queryFn: () => getStatesByCountry(id),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedStatesByCounty[],
        retry: false,
    });
};

export const useGetCitiesByStateAndCountry = (payload: { country: string; state: string; }) => {
    return useQuery({
        enabled: !!payload.state,
        queryKey: [GET_CITIES_BY_STATE_AND_COUNTRY, payload],
        queryFn: () => getCitiesByStateAndCountry(payload),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedCitiesByStateAndCountry[],
        retry: false,
    });
};