import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const authCodeSchema = Yup.object().shape({
    email_code: Yup.string().trim().required("Email code is required"),
    phone_code: Yup.string().trim().required("Phone code is required"),
});

export const changeEmailSchema = Yup.object().shape({
  email: EmailSchema
});