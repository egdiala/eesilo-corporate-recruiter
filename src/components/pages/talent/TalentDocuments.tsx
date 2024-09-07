import React from "react";
import { motion } from "framer-motion";
import emptyState from "@/assets/empty_state.webp";
import { tabVariants } from "@/constants/animateVariants";

export const TalentDocuments: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-5">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Documents</h1>
                <p className="text-base text-gray-500">Access and view documents of this candidate.</p>
            </div>
            <div className="flex flex-col items-center gap-2 py-14 flex-1">
                <img src={emptyState} alt="emptyState" className="size-24" />
                <div className="grid gap-1 text-center">
                    <h2 className="font-medium text-base text-gray-900">No documents found</h2>
                    <p className="text-sm text-gray-600">This talent has no documents</p>
                </div>
            </div>
        </motion.div>
    )
}