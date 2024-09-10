import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Button, CheckBox, ContentDivider, Toggle } from "@/components/core";

export const BillingPage: React.FC = () => {
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10">
            <div className="flex flex-col gap-6 bg-white rounded-2xl lg:p-8">
                <div className="grid gap-2">
                    <h1 className="font-medium text-lg text-gray-900">Select a package plan</h1>
                    <p className="text-base text-gray-400">Select a subscription plan to continue enjoying Neesilo</p>
                </div>
                <ContentDivider />
                <div className="flex flex-col gap-6">
                    <div className="flex items-center py-4 px-5 gap-4 w-fit mx-auto border border-gray-200 rounded-full">
                        <span className="font-medium text-xs text-black">Monthly</span>
                        <Toggle checked />
                        <span className="font-medium text-xs text-black">Yearly</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col border border-gray-200 bg-white rounded-2xl">
                            <div className="pb-8 px-8 pt-[3.75rem] grid gap-4 justify-items-center">
                                <div className="grid gap-2 justify-items-center">
                                    <div className="py-0.5 px-2 bg-success-100 rounded-full text-center font-medium text-xs text-success-800 w-fit">Basic plan</div>
                                    <h1 className="font-semibold text-4xl text-gray-900">$50/yr</h1>
                                </div>
                                <Button theme="primary" variant="filled" size="40" block>Select Plan</Button>
                            </div>
                            <div className="pb-10 px-8 grid gap-4">
                                {
                                    Array.from({ length: 4 }).map((_, index) =>
                                        <CheckBox
                                            checked
                                            key={index}
                                            label={<div className="font-medium text-sm text-gray-900">Feature content {index + 1}</div>}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-200 bg-white rounded-2xl">
                            <div className="pb-8 px-8 pt-[3.75rem] grid gap-4 justify-items-center relative">
                                <div className="absolute bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-b-xl">Recommended</div>
                                <div className="grid gap-2 justify-items-center">
                                    <div className="py-0.5 px-2 bg-warning-100 rounded-full text-center font-medium text-xs text-warning-900 w-fit">Intermediate plan</div>
                                    <h1 className="font-semibold text-4xl text-gray-900">$150/yr</h1>
                                </div>
                                <Button theme="primary" variant="filled" size="40" block>Select Plan</Button>
                            </div>
                            <div className="pb-10 px-8 grid gap-4">
                                {
                                    Array.from({ length: 4 }).map((_, index) =>
                                        <CheckBox
                                            checked
                                            key={index}
                                            label={<div className="font-medium text-sm text-gray-900">Feature content {index + 1}</div>}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col border border-gray-200 bg-white rounded-2xl">
                            <div className="pb-8 px-8 pt-[3.75rem] grid gap-4 justify-items-center">
                                <div className="grid gap-2 justify-items-center">
                                    <div className="py-0.5 px-2 bg-blue-50 rounded-full text-center font-medium text-xs text-blue-800 w-fit">Professional plan</div>
                                    <h1 className="font-semibold text-4xl text-gray-900">$470/yr</h1>
                                </div>
                                <Button theme="primary" variant="filled" size="40" block>Select Plan</Button>
                            </div>
                            <div className="pb-10 px-8 grid gap-4">
                                {
                                    Array.from({ length: 4 }).map((_, index) =>
                                        <CheckBox
                                            checked
                                            key={index}
                                            label={<div className="font-medium text-sm text-gray-900">Feature content {index + 1}</div>}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}