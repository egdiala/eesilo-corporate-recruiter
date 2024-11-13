export interface FetchedCountries {
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    states: {
        id: number;
        name: string;
        state_code: string;
        latitude: string;
        longitude: string;
        type: null | string;
    }[]
}

export interface FetchedStatesByCounty {
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    states: {
        id: number;
        name: string;
        state_code: string;
        latitude: string;
        longitude: string;
        type: null | string;
    }[]
}