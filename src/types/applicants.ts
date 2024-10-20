import type { AxiosProgressEvent } from "axios";

export type GetShortlistedQuery = {
    q?: string;
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

export interface RemoveShortlistedParams {
    job_id: string;
    user_id: string;
}

export interface UploadOfferLetterParams {
    application_id: string;
    file: FormData;
    // eslint-disable-next-line no-unused-vars
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export interface ShortlistCandidateParams extends RemoveShortlistedParams {
    invite_status: "0" | "1" | "2" | "3" | "4"; // 0=shortlist, 1=send invite, 2=send interview, 3=hire, 4=reject
    priority?: "0" | "1" | "2" // Use only with invite_status 0. 0=low, 1=mid, 2=high
    interview_data?: {
        time: string;
        date: Date | string;
        meeting_link: string;
        comment: string;
        timezone: string;
    }
}

export interface FetchedTalent {
    specialty_keyword: string[];
    relocation_data: {
        ready_to_relocate: boolean;
        ready_to_travel: boolean;
    };
    match_count: number;
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
    avatar: string;
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

export interface FetchedShortlistedCandidate {
    application_id: string;
    business_id: string;
    user_id: string;
    job_id: string;
    priority: number;
    invite_status: number;
    interview_status: number;
    offer_status: number;
    offer_letter_link: string;
    match_count: number;
    timestamp_data: {
        shortlisted_at: Date | string;
        invite_sent_at: Date | string;
        invite_accepted_rejected_at: Date | string;
        interview_sent_at: Date | string;
    };
    interview_data?: {
        i_date: Date | string;
        i_time: string;
        i_schedule: Date | string;
        i_link?: string;
        i_comment?: string;
    };
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
    createdAt: Date | string;
    updatedAt: Date | string;
    user_data: Omit<FetchedTalent, "user_id"> & { _id: string; } & Omit<SingleTalent, "total">;
    job_data: {
        _id: string;
        title: string;
    }[]
}

export interface SingleTalent extends FetchedTalent {
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
    }[];
    job_invited: {
        job_id: string;
    }[];
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

export type GetDocumentQuery = {
    user_id: string;
    document_id?: string;
    page?: string;
    item_per_page?: string;
    component?: "count" | "view";
}

export interface DocumentData {
    docat_id: string;
    user_id: string;
    docname: string;
    doctype: string;
    year_awarded: number;
    year_expired: number;
    not_expired: boolean;
    description: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    document_id: string;
}

export interface FetchedApplicantDocument {
    user_id: string;
    data: DocumentData[];
    has_permission: boolean;
    group_name: string;
}