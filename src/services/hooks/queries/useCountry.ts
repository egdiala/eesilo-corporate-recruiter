import { useQuery } from "@tanstack/react-query";
import { GET_CITIES_BY_COUNTRY, GET_CITIES_BY_STATE_AND_COUNTRY, GET_COUNTRIES, GET_STATES_BY_COUNTRY } from "@/constants/queryKeys";
import { getCitiesByCountry, getCitiesByStateAndCountry, getCountries, getStatesByCountry } from "@/services/apis/country";
import type { FetchedCitiesByStateAndCountry, FetchedCountries, FetchedStatesByCounty } from "@/types/country";

export const useGetCountries = () => {
    return useQuery({
        queryKey: [GET_COUNTRIES],
        queryFn: getCountries,
        refetchOnWindowFocus: false,
        select: (res: FetchedCountries[]) => res.sort((a,b) => a.name > b.name ? 1 : -1) as FetchedCountries[],
        retry: false,
    });
};

export const useGetStatesByCountry = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_STATES_BY_COUNTRY, id],
        queryFn: () => getStatesByCountry(id),
        refetchOnWindowFocus: false,
        select: (res: FetchedStatesByCounty[]) => res.sort((a,b) => a.name > b.name ? 1 : -1) as FetchedStatesByCounty[],
        retry: false,
    });
};

export const useGetCitiesByStateAndCountry = (payload: { country: string; state: string; }) => {
    return useQuery({
        enabled: !!payload.state,
        queryKey: [GET_CITIES_BY_STATE_AND_COUNTRY, payload],
        queryFn: () => getCitiesByStateAndCountry(payload),
        refetchOnWindowFocus: false,
        select: (res: FetchedCitiesByStateAndCountry[]) => res.sort((a,b) => a.name > b.name ? 1 : -1) as FetchedCitiesByStateAndCountry[],
        retry: false,
    });
};

export const useGetCitiesByCountry = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_CITIES_BY_COUNTRY, id],
        queryFn: () => getCitiesByCountry(id),
        refetchOnWindowFocus: false,
        select: (res: FetchedCitiesByStateAndCountry[]) => res.sort((a,b) => a.name > b.name ? 1 : -1) as FetchedCitiesByStateAndCountry[],
        retry: false,
    });
};