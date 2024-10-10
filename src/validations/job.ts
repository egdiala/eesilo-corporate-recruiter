import * as Yup from "yup";

export const createJobSchema = Yup.object().shape({
    title: Yup.string().trim().required("Job title is required"),
    description: Yup.string().trim().required("Job description is required"),
    year_exp: Yup.string().trim().required("Years of experience is required"),
    country: Yup.string().trim().required("Select a country"),
    state: Yup.string().trim().required("Select a state"),
    city: Yup.string().trim().required("Select a city"),
    requirement: Yup.array().of(Yup.string().trim().required("Requirements is required")).min(1, "At least one requirement"),
    required_travel: Yup.string().trim().required("Select an option"),
    required_relocation: Yup.string().trim().required("Select an option"),
    expected_salary: Yup.string().trim().required("Salary is required"),
});

export const scheduleInterviewSchema = Yup.object().shape({
    time: Yup.string().trim().required("Select a time for the interview"),
    date: Yup.string().trim().required("Select an interview date"),
    meeting_link: Yup.string().trim().required("Enter a meeting link"),
});

export const uploadJobOfferSchema = Yup.object().shape({
    file: Yup.mixed().required("Select a file to upload").test("fileType", "Only PDF files are allowed", (value) => {
      if (value && value instanceof File) {
        return value.type === "text/pdf" || value.name.endsWith(".pdf");
      }
      return false;
    }),
})