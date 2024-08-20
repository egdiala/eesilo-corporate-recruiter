import React, { useMemo, useState } from "react"
import logo from "@/assets/logo.svg"
import { Button } from "@/components/core"
import { AnimatePresence } from "framer-motion"
import { ContactPerson, OrganizationInformation, StaffsAndAccessControl, Verification } from "@/components/pages/onboarding"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { useSearchParams } from "react-router-dom"


export const OnboardingPage: React.FC = () => {
    const stages = ["bio_data", "contact_person", "staff_access", "eid_number"];
    const [searchParams] = useSearchParams()
    const [selectedIndex, setSelectedIndex] = useState(stages.indexOf(searchParams.get("step") as string))
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
                label: "Staffs and Access Control",
            },
            {
                id: 4,
                label: "Verification",
            }
        ]
    },[])
    
    return (
        <div className="flex flex-col max-w-7xl w-full mx-auto">
            <header className="flex flex-col md:flex-row items-center gap-3 px-[1.125rem] md:px-8 py-3 md:py-5 border-b border-gray-200">
                <div className="grid p-0 place-content-center">
                    <img src={logo} alt="neesilo_logo" />
                </div>
                <div className="flex items-start w-full">
                    <div className="grid gap-1 flex-1">
                        <h1 className="font-medium text-lg text-gray-900">Setup your profile</h1>
                        <p className="font-medium text-base text-gray-500">Get started by setting up your profile. It’s quick and easy!</p>
                    </div>
                    <Button theme="primary" variant="stroke" size="40" onClick={() => setSelectedIndex((prev) => prev < 3 ? prev + 1 : 0)}>Skip for now</Button>
                </div>
            </header>
            <TabGroup as="section" className="flex flex-col md:flex-row py-[1.125rem] md:py-12 px-[1.125rem] md:px-12 gap-10" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className="flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile setup menu</div>
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
                        <StaffsAndAccessControl />
                    </TabPanel>
                    <TabPanel as={AnimatePresence} mode="popLayout">
                        <Verification />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}