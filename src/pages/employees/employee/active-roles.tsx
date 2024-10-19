import React, { Fragment } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useGetShortlistedCandidate } from "@/services/hooks/queries";
import { RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import type { ActiveJobRole } from "@/types/employee";
import { useParams } from "react-router-dom";


export const EmployeeActiveRolesPage: React.FC = () => {
    const { id } = useParams()
    const { data: activeJobs, isFetching } = useGetShortlistedCandidate<ActiveJobRole[]>({ offer_status: "1", talentId: id as string })

    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex flex-col border border-gray-200 rounded-xl gap-4 p-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-b-[#E2E4E9]">
                            <Icon icon="ri:briefcase-4-line" className="size-6 text-warning-500" />
                            <h2 className="font-medium text-base text-gray-900">Active Job Roles</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                activeJobs?.map((work) =>
                                    <div className="flex flex-col gap-1.5" key={work?.job_id}>
                                        <h3 className="font-medium text-sm text-gray-900 capitalize">{work?.job_data?.title}</h3>
                                        <p className="text-xs text-gray-900 capitalize">{work?.job_data?.title}</p>
                                        <span className="text-xs text-gray-500">{format(work?.timestamp_data?.offer_made_at, "MMMM yyyy")} - Present</span>
                                    </div>
                                )
                            }
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