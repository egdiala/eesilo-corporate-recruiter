import React, { Fragment } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";

export const JobCard: React.FC = () => {
    const statuses = [
        { label: "Total Invited", value: "20", icon: "ri:user-received-2-line", iconColor: "text-blue-500" },
        { label: "Accepted", value: "10", icon: "ri:user-follow-line", iconColor: "text-success-500" },
        { label: "Pending", value: "10", icon: "ri:user-add-line", iconColor: "text-gray-500" },
        { label: "Declined", value: "10", icon: "ri:user-forbid-line", iconColor: "text-error-500" },
    ]
    return (
        <div className="grid gap-5 bg-gray-25 border border-blue-25 p-5 rounded-xl">
            <div className="grid gap-2.5">
                <h1 className="font-semibold text-base text-gray-900">Certified Health Worker</h1>
                <p className="font-normal text-sm text-gray-600 line-clamp-2">Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id. Lorem ipsum dolor sit amet consectetur. Ut in ultrices ultricies lacinia id </p>
            </div>
            <hr className="border-gray-300" />
            <div className="flex items-center gap-2.5 w-full">
                {
                    statuses.map((status, index) =>
                        <Fragment key={index}>
                            <div className="grid gap-3.5 flex-1">
                                <div className="flex items-center gap-1.5">
                                    <Icon icon={status.icon} className={cn("size-5", status.iconColor)} />
                                    <span className="font-normal text-xs text-gray-800">{status.label}</span>
                                </div>
                                <span className="font-medium text-base text-gray-800">{status.value}</span>
                            </div>
                            <RenderIf condition={index !== (statuses.length - 1)}><div className="h-full rounded w-0 block border-r border-r-gray-300" /></RenderIf>
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}