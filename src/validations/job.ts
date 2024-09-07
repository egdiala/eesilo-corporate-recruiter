import * as Yup from "yup";

export const createJobSchema = Yup.object().shape({
    title: Yup.string().trim().required("Job title is required"),
    description: Yup.string().trim().required("Job description is required"),
    year_exp: Yup.string().trim().required("Years of experience is required"),
    country: Yup.string().trim().required("Select a country"),
    state: Yup.string().trim().required("Select a state"),
    city: Yup.string().trim().required("Select a city"),
    requirement: Yup.string().trim().required("Requirements is required"),
    required_travel: Yup.string().trim().required("Select an option"),
    required_relocation: Yup.string().trim().required("Select an option"),
    expected_salary: Yup.string().trim().required("Salary is required"),
});