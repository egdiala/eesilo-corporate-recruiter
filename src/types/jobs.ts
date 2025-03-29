export type CreateJobParams = {
    title: string;
    description: string;
    year_exp: string;
    country: string;
    state: string;
    city: string;
    job_req: string,
    about_job: string,
    job_keyword: string[];
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

export interface HiredCandidate {
    business_id: string;
    user_id: string;
    job_id: string;
    priority: number;
    invite_status: number;
    interview_status: number;
    offer_status: number;
    timestamp_data: {
        shortlisted_at: Date | string;
        invite_sent_at: Date | string;
        invite_accepted_rejected_at: Date | string;
        interview_sent_at: Date | string;
        offer_made_at: Date | string;
    },
    createdAt: Date | string;
    updatedAt: Date | string;
    interview_data: {
        i_date: string;
        i_time: string;
        i_schedule: Date | string;
        i_link: string;
        i_comment: string;
    },
    offer_letter_link: string;
    user_data: {
        specialty_keyword: string[];
        relocation_data: {
            ready_to_relocate: boolean;
            ready_to_travel: boolean;
        },
        address_data: {
            address: string;
            city: string;
            country: string;
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
        },
        avatar: string;
    },
    job_data: {
        title: string;
        year_exp: number;
        required_travel: number;
        required_relocation: number;
        country: string;
        city: string;
        requirement: string[];
    },
    application_id: string;
    match_count: number;
}