import React from "react";
import { Button, InputField, SelectInput } from "@/components/core";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";

export const OrganizationInformation: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Organization’s Information</h2>
                <p className="text-base text-gray-400">Provide basic information about your organization.</p>
            </div>
            <hr />
            <InputField label="Organization’s Name" placeholder="Organisation name" size="40" type="text" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Telephone Number" placeholder="(555) 000-0000" size="40" type="text" required />
                <SelectInput label="Country" placeholder="Country" size="40" options={[]} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput label="State" placeholder="Select state" size="40" type="text" options={[]} required />
                <SelectInput label="City" placeholder="Select city" size="40" type="text" options={[]} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Address" placeholder="Address" size="40" type="text" required />
                <InputField label="Zip code" placeholder="Zip code" size="40" type="text" required />
            </div>
            <InputField label="Company Website" placeholder="Website" size="40" type="text" required />
            <Button theme="primary" variant="filled" size="40">Save and continue</Button>
        </motion.div>
    )
}