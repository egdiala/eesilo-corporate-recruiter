import React from "react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Toggle } from "@/components/core"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"


export const Security: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Security</h1>
                <p className="text-base text-gray-400">Edit and update security details to get your account secured</p>
            </div>
            <hr className="border-[#E2E4E9]" />
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-6">
                    <div className="grid gap-2 flex-1">
                        <h2 className="font-medium text-sm text-gray-900">Enable 2Factor Authentication</h2>
                        <p className="text-sm text-gray-500">Agree to receive OTP Authentication with your registered email address and phone number securely</p>
                    </div>
                    <Toggle />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-medium text-sm text-gray-900">Choose OTP Channel</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Email</span>
                            <Toggle />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Phone Number</span>
                            <Toggle />
                        </div>
                    </div>
                </div>
            </div>
            <Link className="flex items-center gap-6" to="change-email">
                <div className="grid gap-2 flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Email Address</h2>
                    <p className="text-sm text-gray-500">Update your email address</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </Link>
            <Link className="flex items-center gap-6" to="change-password">
                <div className="grid gap-2 flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Password</h2>
                    <p className="text-sm text-gray-500">Update your password</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </Link>
        </motion.div>
    )
}