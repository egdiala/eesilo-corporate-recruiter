import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, InputField } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useUpdateAccount } from "@/services/hooks/mutations";
import { verificationInfoSchema } from "@/validations/onboarding";

export const Verification: React.FC = () => {
    const navigate = useNavigate()
    const { mutate, isPending } = useUpdateAccount("EIN submitted for verification", () => navigate("/"))
    
    const { handleSubmit, isValid, register, values } = useFormikWrapper({
        initialValues: {
            ein_id: "",
        },
        validationSchema: verificationInfoSchema,
        onSubmit: () => {
            mutate({ ...values })
            
        },
    })
    return (
        <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Verification</h2>
                <p className="text-base text-gray-400">Provide your organization’s EIN to verify.</p>
            </div>
            <hr />
            <InputField label="Employer Identification Number (EIN)" placeholder="03-0940998" size="40" type="text" {...register("ein_id")} required />
            <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid} block>Complete Registration</Button>
        </motion.form>
    )
}
