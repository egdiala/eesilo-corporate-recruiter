import React, { Fragment, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import { Button, RenderIf } from "@/components/core"
import { useNavigate, useParams } from "react-router-dom"
import { pageVariants } from "@/constants/animateVariants"
import { useGetTalent } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import type { SingleTalent } from "@/types/applicants"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { JobProgress, TalentInformation } from "@/components/pages/talent"

export const ViewTalentPage: React.FC = () => {
    const { id: talentId } = useParams()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { data: talent, isFetching } = useGetTalent<SingleTalent>(talentId as string)
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "General Information",
            },
            {
                id: 2,
                label: "Documents",
            },
            {
                id: 3,
                label: "Job Progress",
            },
        ]
    }, [])
    
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
                    <div className="flex flex-col gap-0 view-page-container overflow-hidden">
                        <div className="flex items-center gap-2.5 py-5 px-8 border-b border-b-gray-200 bg-white">
                            <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate("/talent")}>
                                <Icon icon="ri:arrow-left-s-line" className="size-5" />
                                Back
                            </Button>
                            <h1 className="text-lg text-gray-900">{talent?.first_name} {talent?.last_name}</h1>
                        </div>
                        <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px:4 lg:px-8 pt-5 pb-10">
                            <TabGroup as="section" className="relative flex items-start gap-5 bg-white rounded-2xl p-4 lg:p-8" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                                <TabList className="sticky top-0 flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile menu</div>
                                    <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll">
                                    {
                                        tabs.map((tab) =>
                                            <Tab key={tab.id} className="flex whitespace-nowrap rounded-lg p-2 text-sm font-medium text-gray-500 focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[hover]:bg-gray-100 data-[hover]:text-gray-900 data-[focus]:outline-0 transition duration-500 ease-out">{tab.label}</Tab>
                                        )
                                    }
                                    </div>
                                </TabList>
                                <TabPanels className="flex-1">
                                    <TabPanel as={AnimatePresence} mode="popLayout">
                                        <TalentInformation talent={talent!} />
                                    </TabPanel>
                                    <TabPanel as={AnimatePresence} mode="popLayout">
                                        <div />
                                    </TabPanel>
                                    <TabPanel as={AnimatePresence} mode="popLayout">
                                        <JobProgress />
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}