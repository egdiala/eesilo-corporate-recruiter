import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";

export const StaffsAndAccessControl: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Staffs and Access Control</h2>
                <p className="text-base text-gray-400">You can grant access to your staffs to perform different actions.</p>
            </div>
            <hr />
            <div className="grid gap-3 py-3.5 border border-dashed border-primary-500 rounded-[0.625rem]">
                <div className="flex flex-col gap-3 items-center w-full mx-auto max-w-64">
                    <Icon icon="ri:add-circle-line" className="size-6 text-primary-500" />
                    <p className="text-sm text-gray-500 text-center">Grant a new user access control over your account</p>
                </div>
            </div>
            <Button theme="primary" variant="filled" size="40">Save and continue</Button>
        </motion.div>
    )
}