import { User } from "./auth";

export interface UpdateAccountParams {
    name?: string;
    phone_number?: string;
    phone_prefix?: string;
    website?: string;
    ein_id?: string | {
        value: string
        status: number;
    };
    twofactor?: {
        is_enabled?: "1" | "0";
        channel?: "email" | "phone";
    };
    address_data?: {
        country?: string;
        country_code?: string;
        state?: string;
        city?: string;
        address?: string;
        zip_code?: string;
    };
    contact_person?: {
        email?: string;
        phone_prefix?: string;
        name?: string;
        job_title?: string;
        phone_number?: string;
    }
}

export interface FetchedAccount extends User, Omit<UpdateAccountParams, "ein_id" | "phone_prefix" | "twofactor" | "website"> {
    avatar: string;
}

export type ConfirmPhoneType = {
    code: string;
}

export type GetCalendarEventQuery = {
    year_month: string // Format is YYYY-MM
}

export interface FetchedCalendarEvent {
    _id: string;
    business_id: string;
    user_id: string;
    title: string;
    comment: string;
    event_schedule: Date | string;
    user_data: {
        first_name: string;
        last_name: string;
        avatar: string;
        specialty_title: string;
    }
    data: {
        time: string;
        date: string;
        meeting_link: string;
    }
}

export interface CreateStaffParams {
    name: string;
    email: string;
    job_title: string;
    access_sensitive_data: "0" | "1"; // 0=NO | 1=YES
}

export interface UpdatePasswordParams {
    otp_channel: "phone" | "email";
    password: string;
}

export interface ConfirmPasswordUpdateParams {
    code: string;
    password: string;
}