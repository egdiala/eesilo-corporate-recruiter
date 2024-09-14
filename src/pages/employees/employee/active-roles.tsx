import React, { Fragment, useEffect } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { capitalizeWords } from "@/utils/capitalize";
import type { SingleTalent } from "@/types/applicants";
import { useGetTalent } from "@/services/hooks/queries";
import { EmptyState, RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";


export const EmployeeActiveRolesPage: React.FC = () => {
    const { data: talent, refetch, isFetching } = useGetTalent<SingleTalent>("")

    useEffect(() => {
        if (talent === undefined) {
            refetch()
        }
    },[refetch, talent])
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex flex-col border border-gray-200 rounded-xl gap-4 p-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-b-[#E2E4E9]">
                            <Icon icon="ri:briefcase-4-line" className="size-6 text-warning-500" />
                            <h2 className="font-medium text-base text-gray-900">Active Job Roles</h2>
                        </div>
                        <RenderIf condition={!!talent?.workexp_data}>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    talent?.workexp_data?.map((work) =>
                                        <div className="flex flex-col gap-1.5" key={work?._id}>
                                            <h3 className="font-medium text-sm text-gray-900 capitalize">{work?.job_title}</h3>
                                            <p className="text-xs text-gray-900 capitalize">{work?.company}</p>
                                            <span className="text-xs text-gray-500">{format(work?.date_data?.start_date, "MMMM yyyy")} - {work?.date_data?.currently_working ? "Present" : format(work?.date_data?.end_date, "MMMM yyyy")}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </RenderIf>
                        <RenderIf condition={!talent?.workexp_data}>
                            <EmptyState emptyStateTitle="No Active Role" emptyStateText={`${capitalizeWords(talent?.first_name as string ?? "")} has no active role at this moment`} />
                        </RenderIf>
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}