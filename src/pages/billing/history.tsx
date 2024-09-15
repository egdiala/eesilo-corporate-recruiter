import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import money from "@/assets/money.png";
import { ContentDivider } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";

export const BillingsHistoryPage: React.FC = () => {
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="w-full max-w-[33.75rem]">
            <div className="flex flex-col gap-6 bg-white rounded-2xl">
                <div className="grid gap-2">
                    <h1 className="font-medium text-lg text-gray-900">Billing History</h1>
                    <p className="text-base text-gray-400">Edit and change payment method for subscriptions and payments</p>
                </div>
                <ContentDivider />
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                    <h2 className="font-medium text-base text-gray-900">Current Plan</h2>
                    <div className="flex-1 bg-gray-100 p-2 flex items-start gap-2 rounded-lg" style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}>
                        <img src={money} alt="money" className="h-12 w-14" />
                        <div className="grid">
                            <h3 className="font-medium text-base text-black">$50/month</h3>
                            <p className="text-xs/5 text-gray-500">Intermediate plan</p>
                            <p className="text-xs/5 text-gray-500">Expires on the 9th August</p>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                    <h2 className="font-medium text-base text-gray-900">Billing History</h2>
                    <button type="button" className="border border-dashed border-gray-300 p-4 gap-3.5 flex items-start rounded-xl">
                        <Icon icon="ri:bank-card-line" className="size-6 text-gray-500" />
                        <div className="grid justify-items-start gap-1">
                            <h3 className="font-medium text-sm text-gray-900">New Method</h3>
                            <p className="text-sm text-gray-500">Add a new payment method</p>
                        </div>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}