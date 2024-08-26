export type CreateJobParams = {
    title: string;
    description: string;
    year_exp: string;
    country: Object;
    city: string;
    requirement: string[];
    required_travel: "0" | "1"; // 0=no travel | 1=required travel
    required_relocation: "0" | "1"; // 0=no relocation | 1=required relocation
    expected_salary: string;
}