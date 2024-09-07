import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Icon } from "@iconify/react";

export const NotificationsPage: React.FC = () => {
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10">
            <div className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl lg:p-8">
                {
                    Array.from({ length: 2 }).map((_,index) =>
                        <div key={index} className="flex items-center gap-3.5 p-4 flex-1">
                            <div className="grid place-content-center p-1.5 rounded-full border border-gray-200">
                                <Icon icon="uil:bell" className="size-5 text-gray-600" />
                            </div>
                            <div className="grid gap-1 flex-1">
                                <h2 className="font-medium text-sm text-gray-900">Notification Title</h2>
                                <p className="text-xs text-gray-600">Insert the content description here.</p>
                            </div>
                            <div className="flex items-end flex-col text-right text-xs text-gray-600">
                                Today<br />
                                02:33 pm
                            </div>
                        </div>
                    )
                }
            </div>
        </motion.div>
    )
}