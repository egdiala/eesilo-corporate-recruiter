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
        is_enabled?: "1" | "2";
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

export type GetCalendarEventQuery = {
    year_month: string // Format is YYYY-MM
}