import React, { Fragment, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Button, RenderIf } from "@/components/core"
import { useGetJob } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { useNavigate, useParams } from "react-router-dom"
import { pageVariants } from "@/constants/animateVariants"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Hired, JobInformation, SearchCandidates, ShortlistedCandidates } from "@/components/pages/jobs"

export const ViewJobPage: React.FC = () => {
    const { id: jobId } = useParams()
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { data: job, isFetching } = useGetJob(jobId as string)
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Job Information",
            },
            {
                id: 2,
                label: "Hired",
            },
            {
                id: 3,
                label: "Shortlisted Candidates",
            },
            {
                id: 4,
                label: "Search Candidates",
            }
        ]
    },[])

    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
                    <div className="flex flex-col gap-0 view-page-container overflow-hidden">
                        <div className="flex items-center gap-2.5 py-3 md:py-5 px-4 md:px-8 border-b border-b-gray-200 bg-white">
                            <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate("/jobs")}>
                                <Icon icon="ri:arrow-left-s-line" className="size-5" />
                                Back
                            </Button>
                            <h1 className="text-lg text-gray-900">{job?.title}</h1>
                        </div>
                        <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px-4 lg:px-8 pt-5 pb-10">
                            <TabGroup as="section" className="relative flex flex-col md:flex-row md:items-start gap-5 bg-white rounded-2xl p-4 lg:p-8" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                                <TabList className="md:sticky top-0 flex flex-col h-fit gap-2 p-2.5 overflow-x-hidden border border-gray-200 rounded-2xl max-w-96 md:max-w-72 w-full">
                                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile menu</div>
                                    <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll scrollbar-hide">
                                    {
                                        tabs.map((tab) =>
                                            <Tab key={tab.id} className="flex whitespace-nowrap rounded-lg p-2 text-sm font-medium text-gray-500 focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[hover]:bg-gray-100 data-[hover]:text-gray-900 data-[focus]:outline-0 transition duration-500 ease-out">{tab.label}</Tab>
                                        )
                                    }
                                    </div>
                                </TabList>
                                <TabPanels className="flex-1">
                                    <TabPanel>
                                        <JobInformation job={job!} />
                                    </TabPanel>
                                    <TabPanel>
                                        <Hired />
                                    </TabPanel>
                                    <TabPanel>
                                        <ShortlistedCandidates />
                                    </TabPanel>
                                    <TabPanel>
                                        <SearchCandidates />
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