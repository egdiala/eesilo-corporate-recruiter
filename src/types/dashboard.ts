export type GetDashboardStatsQuery = {
    component: "job-data-count" | "job-yearly-count" | "job-interview-count"
}

export interface JobDataCountType {
    total_job: number;
    total_employee: number;
    total_invited: number;
    total_shortlisted: number;
}