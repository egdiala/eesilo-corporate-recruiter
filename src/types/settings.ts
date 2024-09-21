export interface FetchedStaffAdmin {
    name: string;
    account_type: "business-admin",
    phone_prefix: string;
    phonenumber_verified: boolean;
    email: string;
    admin_data: {
        business_id: string;
        myjob_role: string;
        myaccess_sensitive: number;
    },
    user_id: string;
}