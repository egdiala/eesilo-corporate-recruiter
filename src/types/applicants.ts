export type GetShortlistedQuery = {
    job_id?: string;
    invite_status?: "0" | "1" | "2" | "3" | "4"; // 0=shortlisted, 1=accepted, 2=rejected, 3=invited, 4=interview sent
    offer_status?: "0" | "1" | "2" // 0=pending, 1=hired, 2=rejected
    start_date?: string;
    end_date?: string;
    page?: string;
    item_per_page?: string;
    component?: "count";
}

export type GetTalentsQuery = {
    job_id?: string;
    keyword?: string;
    start_date?: string;
    end_date?: string;
    country?: string;
    city?: string;
    year_exp?: string;
    salary?: string;
    page?: string;
    item_per_page?: string;
    component?: "count";
}

export interface FetchedTalent {
    specialty_keyword: string[];
    relocation_data: {
        ready_to_relocate: boolean;
        ready_to_travel: boolean;
    },
    address_data: {
        address: string;
        city: string;
        country: string;
        country_code: string;
        state: string;
        zip_code: number;
    },
    first_name: string;
    last_name: string;
    specialty_data: {
        industry: string;
        specialty_main: string;
        specialty_sub: string;
        title: string;
        year_exp: number;
    };
    user_id: string;
}

export interface FetchedTalentCount {
    total: number;
}