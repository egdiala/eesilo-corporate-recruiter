import React from "react";
import { motion } from "framer-motion";
import { Button, InputField } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";

export const Verification: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Verification</h2>
                <p className="text-base text-gray-400">Provide your organization’s EIN to verify.</p>
            </div>
            <hr />
            <InputField label="Employer Identification Number (EIN)" placeholder="03-0940998" size="40" type="text" required />
            <Button theme="primary" variant="filled" size="40" block>Complete Registration</Button>
        </motion.div>
    )
}