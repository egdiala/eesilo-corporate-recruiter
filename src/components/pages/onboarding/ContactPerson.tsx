import React from "react";
import { motion } from "framer-motion";
import { Button, InputField } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";

export const ContactPerson: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Contact Person</h2>
                <p className="text-base text-gray-400">Provide basic information about your organization.</p>
            </div>
            <hr />
            <InputField label="Name of Contact Person" placeholder="Name" size="40" type="text" required />
            <InputField label="Job Title" placeholder="Job title" size="40" type="text" required />
            <InputField label="Phone Number" placeholder="(555) 000-0000" size="40" type="text" required />
            <InputField label="Email" placeholder="Email" size="40" type="text" required />
            <Button theme="primary" variant="filled" size="40">Save and continue</Button>
        </motion.div>
    )
}