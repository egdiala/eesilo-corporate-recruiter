import React, { Fragment } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Button, RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import type { JobYearlyCountType } from "@/types/dashboard"
import { JobsPerformance, PerformanceStats } from "@/components/pages/reports"
import { useGetDashboardStats } from "@/services/hooks/queries"

export const ReportsPage: React.FC = () => {
    const { data: yearlyDataCount, isFetching: fetchingYearlyCount } = useGetDashboardStats<JobYearlyCountType[]>({ component: "job-yearly-count" })
    const stats = [
        { label: "Jobs Posted", value: "854", percentage: "24 %" },
        { label: "Invitations", value: "1,278", percentage: "24 %" },
        { label: "Hires", value: "154" },
    ]
    return (
        <Fragment>
            <RenderIf condition={!fetchingYearlyCount}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
                    <div className="flex flex-col gap-0 bg-white rounded-2xl">
                        <div className="flex items-center justify-between p-8">
                            <h1 className="font-semibold text-base text-gray-900">Analytics & Reports</h1>
                            <Button theme="primary" variant="filled" size="40">
                                <Icon icon="ri:file-list-2-line" className="size-5" />
                                Generate Report
                            </Button>
                        </div>
                        <div className="bg-gray-100 grid grid-cols-3 py-5 border-y border-dashed border-[#94A3B8] divide-x divide-dashed divide-[#94A3B8]">
                            {
                                stats.map((stat) =>
                                    <div key={stat.label} className="grid gap-1 justify-items-center border-r-dashed">
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-semibold text-xl text-gray-900">{stat.value}</h2>
                                            <RenderIf condition={!!stat.percentage}>
                                                <div className="flex items-center gap-0.5 font-medium text-xs text-primary-500">
                                                    {stat?.percentage}
                                                    <Icon icon="ic:round-trending-up" className="size-4" />
                                                </div>
                                            </RenderIf>
                                        </div>
                                        <p className="font-medium text-sm text-gray-400">{stat.label}</p>
                                    </div>
                                )
                            }
                        </div>
                        <PerformanceStats yearData={yearlyDataCount ?? []} />
                        <div className="grid grid-cols-2 gap-6 p-6">
                            <JobsPerformance />
                            <JobsPerformance />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingYearlyCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}