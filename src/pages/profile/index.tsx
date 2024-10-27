import React, { Fragment, useMemo, useState } from "react"
import { RenderIf } from "@/components/core"
import { AnimatePresence, motion } from "framer-motion"
import { useGetAccount } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { OrganizationInformation, ContactPerson, Verification } from "@/components/pages/profile"

export const ProfilePage: React.FC = () => {
    const { data: account, isLoading } = useGetAccount()
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
        <Fragment>
            <RenderIf condition={!isLoading}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
                    <TabGroup as="section" className="relative grid md:flex flex-col md:flex-row gap-5 bg-white rounded-2xl p-4 lg:p-8" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                        <TabList className="md:sticky top-0 flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                            <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile menu</div>
                            <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll scrollbar-hide">
                            {
                                tabs.map((tab) =>
                                    <Tab key={tab.id} className="flex whitespace-nowrap rounded-lg p-2 text-sm font-medium text-gray-500 focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[hover]:bg-gray-100 data-[hover]:text-gray-900 data-[focus]:outline-0 transition duration-500 ease-out">{tab.label}</Tab>
                                )
                            }
                            </div>
                        </TabList>
                        <TabPanels className="max-w-xl w-full flex-1">
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <OrganizationInformation account={account!} />
                            </TabPanel>
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <ContactPerson account={account!} />
                            </TabPanel>
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <Verification account={account!} />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}