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