export type GetDashboardStatsQuery = {
    component: "job-data-count" | "job-yearly-count" | "job-interview-count" | "report-jobstat-count" | "report-jobyearly-count" | "report-joblocation-count" | "report-jobhired-count"
}

export interface JobDataCountType {
    total_job: number;
    total_employee: number;
    total_invited: number;
    total_shortlisted: number;
}

export interface JobYearlyCountType {
    total_invited: number;
    total_accepted: number;
    total_rejected: number;
    total_offer: number;
    month: string;
}

export interface ReportJobStatCount {
    _id: null;
    total_job: number;
    total_invite: number;
    total_hired: number;
}

export interface ReportJobHiredCount {
    _id: string;
    total_hired: number;
    job_title: string;
}

export interface ReportJobLocationCount {
    _id: string;
    state: string;
    total: number
}

export interface InterviewDataCountType {
    timestamp_data: {
        shortlisted_at: Date | string;
    },
    interview_data: {
        i_date: string;
        i_time: string;
        i_schedule: Date | string;
    },
    user_data: {
        _id: string;
        first_name: string;
        last_name: string;
        avatar: string;
    }
}