import React, { Fragment, useMemo } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dummyJobs, dummyTalents } from "@/constants/data";
import { RenderIf } from "@/components/core";
import { JobCard } from "@/components/pages/jobs";
import { TalentCard } from "@/components/pages/talent";
import { Loader } from "@/components/core/Button/Loader";
import type { JobDataCountType } from "@/types/dashboard";
import { pageVariants } from "@/constants/animateVariants";
import { useGetDashboardStats } from "@/services/hooks/queries/useDashboard";
import { PerformanceStats, RecentJobUpdates, UpcomingInterviews } from "@/components/pages/dashboard";

export const DashboardPage: React.FC = () => {
    const { data: dataCount, isFetching: fetchingDataCount } = useGetDashboardStats<JobDataCountType>({ component: "job-data-count" })
    const { data: interviewCount, isFetching: fetchingInterviewCount } = useGetDashboardStats<JobDataCountType>({ component: "job-interview-count" })
    const { data: yearlyCount, isFetching: fetchingYearlyCount } = useGetDashboardStats<JobDataCountType>({ component: "job-yearly-count" })
    const cards = useMemo(() => {
        return [
            { icon: "ri:briefcase-4-line", iconClass: "text-warning-500 size-8", background: "bg-warning-25", label: "Job Posts", value: dataCount?.total_job },
            { icon: "ri:user-follow-line", iconClass: "text-success-500 size-8", background: "bg-success-25", label: "Active Employees", value: dataCount?.total_employee },
            { icon: "ri:user-received-2-line", iconClass: "text-blue-500 size-8", background: "bg-blue-25", label: "Shortlisted", value: dataCount?.total_shortlisted },
            { icon: "ri:user-received-line", iconClass: "text-error-500 size-8", background: "bg-error-25", label: "Total Invited", value: dataCount?.total_invited },
        ]
    },[dataCount?.total_employee, dataCount?.total_invited, dataCount?.total_job, dataCount?.total_shortlisted])
    console.log("interviewCount", interviewCount)
    console.log("yearlyCount", yearlyCount)
    return (
        <Fragment>
            <RenderIf condition={!fetchingDataCount && !fetchingInterviewCount && !fetchingYearlyCount}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10 view-page-container overflow-y-scroll">
                    <div className="flex flex-col p-8 gap-6 bg-white rounded-2xl">
                        <div className="grid grid-cols-4 gap-5">
                            {
                                cards.map((card) =>
                                    <div className={cn(card.background, "rounded-xl p-5 flex flex-col gap-9")}>
                                        <div className="flex items-center gap-3.5">
                                            <Icon icon={card.icon} className={card.iconClass} />
                                            <span className="font-medium text-base text-gray-600">{card.label}</span>
                                        </div>
                                        <h4 className="font-medium text-3xl text-gray-900">{card.value}</h4>
                                    </div>
                                )
                            }
                        </div>
                        <div className="grid gap-5">
                            <div className="flex items-center justify-between">
                                <h4 className="uppercase font-medium text-xs text-[#868C98] py-1 px-2">recommended talents</h4>
                                <Link to="/talent" className="py-1 px-2 text-right font-medium uppercase text-xs text-primary-500">Search more talents</Link>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                            {
                                dummyTalents.map((item) =>
                                    <TalentCard key={item?.user_id} talent={item!} as={Link} to={`/employees/${item?.user_id}/view`} />
                                )
                            }
                            </div>
                        </div>
                        <PerformanceStats />
                        <hr className="border-gray-200" />
                        <div className="grid gap-6">
                            <div className="flex items-center justify-between">
                                <h4 className="uppercase font-medium text-xs text-[#868C98] py-1 px-2">POPULAR posted jobs</h4>
                                <Link to="/jobs" className="py-1 px-2 text-right font-medium uppercase text-xs text-primary-500">see all jobs</Link>
                            </div>
                            <div className="flex items-center overflow-x-scroll gap-5">
                            {
                                dummyJobs.map((job, index) =>
                                    <JobCard key={index} job={job} />
                                )
                            }
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <UpcomingInterviews />
                            <RecentJobUpdates />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingDataCount || fetchingInterviewCount || fetchingYearlyCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}