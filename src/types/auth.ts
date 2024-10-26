export type LoginType = {
    email: string;
    password: string;
}

export type TwoFaLoginType = {
    email_otp?: string;
    phone_otp?: string;
}

export interface User {
    phone_prefix: string;
    phonenumber_verified: boolean;
    email: string;
    status: number;
    website: string;
    twofactor: {
        is_enabled: number;
        channel: string;
    };
    onboarding_stage: {
        bio_data: boolean;
        contact_person: boolean;
        eid_number: boolean;
    };
    ein_id: {
        value: string;
        status: number;
    };
    createdAt: Date | string;
    updatedAt: Date | string;
    user_id: string;
}

export interface TwoFaLogin {
    action: string;
    channel: string[];
    code: string;
}

export type ResendOTPType = {
    request_type: "update-email" | "update-phone" | "update-password" | "2fa-login"
    email: string
}