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

export interface ActiveJobRole {
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
            country_code: string;
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
    education_data: {
        _id: string;
        user_id: string;
        degree_name: string;
        course_field: string;
        school_name: string;
        completion_year: number;
        description: string;
        createdAt: Date | string;
        updatedAt: Date | string;
        __v: number;
    }[]
    workexp_data: {
        _id: string;
        user_id: string;
        job_title: string;
        company: string;
        date_data: {
            start_date: Date | string;
            end_date: Date | string;
            currently_working: boolean;
        },
        address_data: {
            country: string;
            country_code: string;
            state: string;
            address: string;
            city: string;
            zip_code: number;
        },
        description: string;
        createdAt: Date | string;
        updatedAt: Date | string;
        __v: number;
    }[];
}