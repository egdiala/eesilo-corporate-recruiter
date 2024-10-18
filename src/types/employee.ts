import { FetchedTalent } from "./applicants";

export interface FetchedEmployee {
    active_job_count: number;
    user_id: string;
    user_data: Omit<FetchedTalent, "match_count" | "user_id">;
    application_id: number;
}

export interface FetchedEmployeeCount {
    total: number;
}