import React, { Fragment, useMemo } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RenderIf } from "@/components/core";
import type { FetchedJob } from "@/types/jobs";
import { JobCard } from "@/components/pages/jobs";
import { TalentCard } from "@/components/pages/talent";
import type { FetchedTalent } from "@/types/applicants";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetDashboardStats, useGetJobs, useGetTalents } from "@/services/hooks/queries";
import type { InterviewDataCountType, JobDataCountType, JobYearlyCountType } from "@/types/dashboard";
import { PerformanceStats, RecentJobUpdates, UpcomingInterviews } from "@/components/pages/dashboard";

export const DashboardPage: React.FC = () => {
    const { data: dataCount, isFetching: fetchingDataCount } = useGetDashboardStats<JobDataCountType>({ component: "job-data-count" })
    const { data: interviewCount, isFetching: fetchingInterviewCount } = useGetDashboardStats<InterviewDataCountType[]>({ component: "job-interview-count" })
    const { data: yearlyDataCount, isFetching: fetchingYearlyCount } = useGetDashboardStats<JobYearlyCountType[]>({ component: "job-yearly-count" })
    const { data: talents, isFetching: fetchingTalents } = useGetTalents<FetchedTalent[]>({ item_per_page: "3" })
    const { data: jobs, isFetching: fetchingJobs } = useGetJobs<FetchedJob[]>({ item_per_page: "2" })
    const cards = useMemo(() => {
        return [
            { icon: "ri:briefcase-4-line", iconClass: "text-warning-500 size-8", background: "bg-warning-25", label: "Job Posts", value: dataCount?.total_job },
            { icon: "ri:user-follow-line", iconClass: "text-success-500 size-8", background: "bg-success-25", label: "Active Employees", value: dataCount?.total_employee },
            { icon: "ri:user-received-2-line", iconClass: "text-blue-500 size-8", background: "bg-blue-25", label: "Shortlisted", value: dataCount?.total_shortlisted },
            { icon: "ri:user-received-line", iconClass: "text-error-500 size-8", background: "bg-error-25", label: "Total Invited", value: dataCount?.total_invited },
        ]
    },[dataCount?.total_employee, dataCount?.total_invited, dataCount?.total_job, dataCount?.total_shortlisted])

    return (
        <Fragment>
            <RenderIf condition={!fetchingDataCount && !fetchingInterviewCount && !fetchingYearlyCount && !fetchingTalents && !fetchingJobs}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
                    <div className="flex flex-col p-4 md:p-8 gap-6 bg-white rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                                <Link to="/talent" className="py-1 px-2 text-right font-medium uppercase text-xs text-primary-500"><span className="sr-only md:not-sr-only">Search</span> more talents</Link>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {
                                talents?.map((item) =>
                                    <TalentCard key={item?.user_id} talent={item!} as={Link} to={`/talent/${item?.user_id}/view`} />
                                )
                            }
                            </div>
                        </div>
                        <PerformanceStats yearData={yearlyDataCount ?? []} />
                        <hr className="border-gray-200" />
                        <div className="grid gap-6">
                            <div className="flex items-center justify-between">
                                <h4 className="uppercase font-medium text-xs text-[#868C98] py-1 px-2">POPULAR posted jobs</h4>
                                <Link to="/jobs" className="py-1 px-2 text-right font-medium uppercase text-xs text-primary-500">see all jobs</Link>
                            </div>
                            <div className="flex items-center overflow-x-scroll gap-5">
                            {
                                jobs?.map((job, index) =>
                                    <JobCard key={index} job={job} as={Link} to={`/jobs/${job?.job_id}/view`} />
                                )
                            }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <UpcomingInterviews interviews={interviewCount!} />
                            <RecentJobUpdates />
                        </div>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={fetchingDataCount || fetchingInterviewCount || fetchingYearlyCount || fetchingTalents || fetchingJobs}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}