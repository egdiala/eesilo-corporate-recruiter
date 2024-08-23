import * as Yup from "yup";

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