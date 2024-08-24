import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const onboardOrganizationInfoSchema = Yup.object().shape({
    name: Yup.string().trim().required("Organization name is required"),
    phone_number: Yup.string().trim().required("Telephone number name is required"),
    website: Yup.string().trim().required("Company website is required"),
    country: Yup.string().trim().required("Select a country"),
    state: Yup.string().trim().required("Select a state"),
    city: Yup.string().trim().required("Select a city"),
    address: Yup.string().trim().required("Address is required"),
    zip_code: Yup.string().trim().required("Zip code is required"),
});

export const onboardContactPersonSchema = Yup.object().shape({
    name: Yup.string().trim().required("Contact person name is required"),
    job_title: Yup.string().trim().required("Job title is required"),
    phone_number: Yup.string().trim().required("Telephone number name is required"),
    email: EmailSchema,
});