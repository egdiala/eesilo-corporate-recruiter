import * as Yup from "yup";
import { EmailSchema, PasswordSchema } from "./auth";

export const authCodeSchema = Yup.object().shape({
    code: Yup.string().trim().required("Code is required"),
});

export const changeEmailSchema = Yup.object().shape({
  email: EmailSchema
});

export const updatePasswordSchema = Yup.object().shape({
  password: PasswordSchema,
  otp_channel: Yup.string().trim().required("Select how you want to receive OTP")
});

export const confirmUpdatePasswordSchema = Yup.object().shape({
  code: Yup.string().trim().required("Code is required"),
  password: PasswordSchema,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm New Password is required")
});

export const createStaffAdminSchema = Yup.object().shape({
    name: Yup.string().trim().required("Staff name is required"),
    email: EmailSchema,
    job_title: Yup.string().trim().required("Staff role is required"),
    access_sensitive_data: Yup.string().trim().required("Staff access is required"),
});