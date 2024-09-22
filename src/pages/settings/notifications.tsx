import React from "react"
import { motion } from "framer-motion"
import { ContentDivider, Toggle } from "@/components/core"
import { tabVariants } from "@/constants/animateVariants"


export const SettingsNotificationsPage: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Notifications</h1>
                <p className="text-base text-gray-400">Set your notifications preference</p>
            </div>
            <ContentDivider />
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Receive email notifications</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Job invite</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Interview appointment</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Job offer</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">Document access request</span>
                    <Toggle />
                </div>
            </div>
        </motion.div>
    )
}