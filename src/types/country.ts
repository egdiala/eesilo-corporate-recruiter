export interface FetchedCountries {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    phonecode: string;
    capital: string;
    currency: string;
    native: string;
    emoji: string;
}

export interface FetchedStatesByCounty {
    id: number;
    name: string;
    iso2: string;
}

export interface FetchedCitiesByStateAndCountry {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
}