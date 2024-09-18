import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const onboardOrganizationInfoSchema = Yup.object().shape({
    name: Yup.string().trim().required("Organization name is required"),
    phone_number: Yup.string().trim().required("Telephone number is required"),
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
    phone_number: Yup.string().trim().required("Telephone number is required"),
    email: EmailSchema,
});

export const imageUploadSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only PNG and JPEG formats are allowed",
      (file) => file && ((file as File).type.startsWith("image"))
    )
    .test(
      "fileSize",
      "File size must be less than 300KB",
      (file) => file && (file as File).size <= 300 * 1024 // 300KB
    )
});