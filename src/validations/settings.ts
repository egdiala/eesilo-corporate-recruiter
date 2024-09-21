import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const authCodeSchema = Yup.object().shape({
    email_code: Yup.string().trim().required("Email code is required"),
    phone_code: Yup.string().trim().required("Phone code is required"),
});

export const changeEmailSchema = Yup.object().shape({
  email: EmailSchema
});

export const createStaffAdminSchema = Yup.object().shape({
    name: Yup.string().trim().required("Staff name is required"),
    email: EmailSchema,
    job_title: Yup.string().trim().required("Staff role is required"),
    access_sensitive_data: Yup.string().trim().required("Staff access is required"),
});