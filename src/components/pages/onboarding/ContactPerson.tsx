import React from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, InputField, PhoneInput } from "@/components/core";
import { onboardContactPersonSchema } from "@/validations/onboarding";
import { useUpdateAccount } from "@/services/hooks/mutations/useAccount";
import { formatPhoneNumber, parsePhoneNumber } from "react-phone-number-input";


export const ContactPerson: React.FC = () => {
    const { mutate, isPending } = useUpdateAccount("Contact person info added successfully")
    
    const { errors, handleSubmit, isValid, register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: "",
            job_title: "",
            phone_number: "",
            email: "",
        },
        validationSchema: onboardContactPersonSchema,
        onSubmit: () => {
            const formattedPhoneNumber = formatPhoneNumber(values.phone_number).split(" ").join("")
            const parsedPhoneNumber = parsePhoneNumber(values.phone_number)
            const contact_person = {
                email: values.email,
                phone_prefix: parsedPhoneNumber?.countryCallingCode,
                name: values.name,
                job_title: values.job_title,
                phone_number: formattedPhoneNumber,
            }
            mutate({ contact_person })
        },
    })
    return (
        <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Contact Person</h2>
                <p className="text-base text-gray-400">Provide basic information about your organization.</p>
            </div>
            <hr />
            <InputField label="Name of Contact Person" placeholder="Name" size="40" type="text" {...register("name")} required />
            <InputField label="Job Title" placeholder="Job title" size="40" type="text" {...register("job_title")} required />
            <PhoneInput label="Phone Number" placeholder="(555) 000-0000" size="40" value={values.phone_number} onChange={(v) => setFieldValue("phone_number", v, true)} error={errors.phone_number} required />
            <InputField label="Email" placeholder="Email" size="40" type="text" {...register("email")} required />
            <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid} block>Save and continue</Button>
        </motion.form>
    )
}