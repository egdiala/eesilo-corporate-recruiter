import React from "react"
import { motion } from "framer-motion"
import topStatus from "@/assets/top_status.svg"
import { tabVariants } from "@/constants/animateVariants"

export const Verification: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col bg-gray-25 rounded-2xl p-5 gap-3">
            <div className="flex items-start">
                <h2 className="flex-1 font-medium text-lg text-gray-900">Verification</h2>
            </div>
            <hr />
            <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 text-sm">Employer Identification Number (EIN)</span>
                <div className="flex items-center gap-2.5">
                    <span className="text-gray-900 text-base font-medium">09699854</span>
                    <img src={topStatus} alt="top_status" />
                </div>
            </div>
        </motion.div>
    )
}