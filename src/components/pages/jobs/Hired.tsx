import React from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { Button, InputField } from "@/components/core";
import { Icon } from "@iconify/react";

export const Hired: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-900 text-base">Active Employees</h2>
                <div className="flex items-center gap-5 flex-1 max-w-96">
                    <InputField type="text" placeholder="Search employees" iconRight="ri:search-2-line" />
                    <Button theme="neutral" variant="stroke" size="40">
                        <Icon icon="ri:filter-3-line" className="size-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}