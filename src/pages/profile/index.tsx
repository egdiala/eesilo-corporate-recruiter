import React, { useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { OrganizationInformation, ContactPerson, Verification } from "@/components/pages/profile"

export const ProfilePage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Organisation’s Information",
            },
            {
                id: 2,
                label: "Contact Person",
            },
            {
                id: 3,
                label: "Verification",
            }
        ]
    },[])
    return (
        <div className="bg-white rounded-2xl lg:p-8">
            <TabGroup as="section" className="flex flex-col md:flex-row gap-5" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className="flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile menu</div>
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
                        <OrganizationInformation />
                    </TabPanel>
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <ContactPerson />
                    </TabPanel>
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <Verification />
                    </TabPanel>
                </TabPanels>
            </TabGroup>

        </div>
    )
}