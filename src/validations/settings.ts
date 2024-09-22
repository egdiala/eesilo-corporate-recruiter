import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const authCodeSchema = Yup.object().shape({
    code: Yup.string().trim().required("Code is required"),
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