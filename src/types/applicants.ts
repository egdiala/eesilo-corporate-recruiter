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