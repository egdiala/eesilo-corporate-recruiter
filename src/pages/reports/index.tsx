import React, { Fragment, useEffect, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Button, RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import type { JobYearlyCountType, ReportJobHiredCount, ReportJobLocationCount, ReportJobStatCount } from "@/types/dashboard"
import { JobsHiredPerformance, JobsLocation, PerformanceStats } from "@/components/pages/reports"
import { useGetDashboardStats } from "@/services/hooks/queries"

export const ReportsPage: React.FC = () => {
    const [allLoading, setAllLoading] = useState(true)
    const [performanceFilters, setPerformanceFilters] = useState({ year: new Date().getFullYear().toString() })
    const { data: reportJobHired, isLoading: fetchingReportJobHired } = useGetDashboardStats<ReportJobHiredCount[]>({ component: "report-jobhired-count" })
    const { data: reportJobLocation, isLoading: fetchingReportJobLocation } = useGetDashboardStats<ReportJobLocationCount[]>({ component: "report-joblocation-count" })
    const { data: jobStatCount, isLoading: fetchingJobStatCount } = useGetDashboardStats<ReportJobStatCount>({ component: "report-jobstat-count" })
    const { data: yearlyDataCount, isLoading: fetchingYearlyCount } = useGetDashboardStats<JobYearlyCountType[]>({ component: "job-yearly-count", ...performanceFilters })
    const stats = useMemo(() => {
        return [
            { label: "Jobs Posted", value: jobStatCount?.total_job },
            { label: "Invitations", value: jobStatCount?.total_invite },
            { label: "Hires", value: jobStatCount?.total_hired },
        ]
    },[jobStatCount?.total_hired, jobStatCount?.total_invite, jobStatCount?.total_job])
    
    const isLoadingAll = useMemo(() => {
        const loadingStates = [fetchingJobStatCount, fetchingReportJobHired, fetchingReportJobLocation, fetchingYearlyCount]

        return loadingStates.some((item) => item)
    }, [fetchingJobStatCount, fetchingReportJobHired, fetchingReportJobLocation, fetchingYearlyCount])

    useEffect(() => {
        if (!isLoadingAll) {
            setAllLoading(false)
        }
    },[isLoadingAll])
    return (
        <Fragment>
            <RenderIf condition={!allLoading}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
                    <div className="flex flex-col gap-0 bg-white rounded-2xl">
                        <div className="flex items-center justify-between p-4 md:p-8">
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
                                        </div>
                                        <p className="font-medium text-sm text-gray-400">{stat.label}</p>
                                    </div>
                                )
                            }
                        </div>
                        <PerformanceStats loading={fetchingYearlyCount} yearData={yearlyDataCount ?? []} setFilters={setPerformanceFilters} filters={performanceFilters} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3 md:p-6">
                            <JobsHiredPerformance jobData={reportJobHired ?? []} />
                            <JobsLocation jobLocation={reportJobLocation ?? []} />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={allLoading}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}