import React, { ElementType } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";
import type { FetchedJob } from "@/types/jobs";


interface JobCardProps {
    job: FetchedJob
    as?: ElementType | "div"
    [x: string]: unknown
}

export const JobCard: React.FC<JobCardProps> = ({ as, job, ...props }) => {
    const statuses = [
        { label: "Total Invited", value: job?.total_invited, icon: "ri:user-received-2-line", iconColor: "text-blue-500" },
        { label: "Accepted", value: job?.total_accepted, icon: "ri:user-follow-line", iconColor: "text-success-500" },
        { label: "Pending", value: job?.total_pending, icon: "ri:user-add-line", iconColor: "text-gray-500" },
        { label: "Declined", value: job?.total_declined, icon: "ri:user-forbid-line", iconColor: "text-error-500" },
    ]

    const Component = as === undefined ? "div" : as;
    return (
        <Component className="grid gap-5 bg-gray-25 border border-blue-25 p-5 rounded-xl" {...props}>
            <div className="grid gap-2.5">
                <h1 className="font-semibold text-base text-gray-900">{job?.title}</h1>
                <p className="font-normal text-sm text-gray-600 line-clamp-2">{job?.description}</p>
            </div>
            <hr className="border-gray-300" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {
                    statuses.map((status, index) =>
                        <div className="flex items-center gap-2.5" key={index}>
                            <div className="grid gap-3.5 flex-1">
                                <div className="flex items-center gap-1.5 md:w-24">
                                    <Icon icon={status.icon} className={cn("size-5", status.iconColor)} />
                                    <span className="font-normal text-xs text-gray-800 whitespace-nowrap">{status.label}</span>
                                </div>
                                <span className="font-medium text-base text-gray-800">{status.value}</span>
                            </div>
                            <RenderIf condition={index !== (statuses.length - 1)}><div className="hidden h-full rounded w-0 lg:block border-r border-r-gray-300" /></RenderIf>
                        </div>
                    )
                }
            </div>
        </Component>
    )
}