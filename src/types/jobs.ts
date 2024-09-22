export type CreateJobParams = {
    title: string;
    description: string;
    year_exp: string;
    country: string;
    state: string;
    city: string;
    requirement: string[];
    required_travel: "0" | "1"; // 0=no travel | 1=required travel
    required_relocation: "0" | "1"; // 0=no relocation | 1=required relocation
    expected_salary: string;
}

export type GetJobsQuery = {
    q?: string;
    start_date?: string; // should be converted to UTC using the user's time zone. Format is YYYY-MM-DD
    end_date?: string; // should be converted to UTC using the user's time zone. Format is YYYY-MM-DD
    job_status?: "0" | "1" | "2"; // 0=pending, 1=active, 2=suspended
    trash_status?: "1" | "2"; // 1=active, 2=to be deleted
    page?: string;
    item_per_page?: string;
    component?: "count"
}

export type FetchJobRequirementsParams = {
    q?: string;
}

export interface FetchedJob {
    business_id: string;
    title: string;
    description: string;
    year_exp: number;
    required_travel: number;
    required_relocation: number;
    country: string;
    state: string;
    city: string;
    expected_salary: number;
    requirement: string[];
    status: number;
    deletion_data: {
        status: number;
    },
    createdAt: Date | string;
    updatedAt: Date | string;
    job_id: string;
    total_invited: number;
    total_accepted: number;
    total_declined: number;
    total_pending: number;
    total_shortlisted: number;
}

export interface FetchedJobCount {
    total: number;
}