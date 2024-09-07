import React, { useMemo, useState } from "react";
import { Notifications, Security, StaffAccessControl } from "@/components/pages/settings";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export const SettingsPage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Security",
            },
            {
                id: 2,
                label: "Notifications",
            },
            {
                id: 3,
                label: "Staff & Access Control",
            }
        ]
    },[])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10">
            <TabGroup as="section" className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl lg:p-8" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className="flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 scrollbar-hide rounded-2xl md:max-w-72 w-full">
                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Select menu</div>
                    <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll">
                    {
                        tabs.map((tab) =>
                            <Tab key={tab.id} className="flex whitespace-nowrap rounded-lg p-2 text-sm font-medium text-gray-500 focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[hover]:bg-gray-100 data-[hover]:text-gray-900 data-[focus]:outline-0 transition duration-500 ease-out">{tab.label}</Tab>
                        )
                    }
                    </div>
                </TabList>
                <TabPanels className="max-w-xl w-full flex-1">
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <Security />
                    </TabPanel>
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <Notifications />
                    </TabPanel>
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <StaffAccessControl />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </motion.div>
    )
}