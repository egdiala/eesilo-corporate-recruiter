export type LoginType = {
    email: string;
    password: string;
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
        staff_access: boolean;
    };
    ein_id: {
        value: string;
        status: number;
    };
    createdAt: Date | string;
    updatedAt: Date | string;
    user_id: string;
}