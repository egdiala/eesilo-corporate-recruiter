import React, { Fragment, useCallback, useState } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Button } from "@/components/core"
import type { FetchedJob } from "@/types/jobs"
import { tabVariants } from "@/constants/animateVariants"
import { ScheduleInterview } from "../talent/ScheduleInterview"

interface JobProgressProps {
    job: FetchedJob
}

export const JobProgress: React.FC<JobProgressProps> = ({ job }) => {
    const [toggleModals, setToggleModals] = useState({
        openScheduleInvite: false,
    })

    const toggleScheduleInvite = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openScheduleInvite: !toggleModals.openScheduleInvite,
      }))
    },[toggleModals.openScheduleInvite])

    const timeline = [
        {
            id: 1,
            text: "You have sent a job invitation to this employee",
            title: "Job Invitation Sent",
            content: <Fragment></Fragment>,
            done: true
        },
        {
            id: 2,
            text: "You can schedule an interview with this employee",
            title: "Schedule Interview",
            content: <Button type="button" theme="primary" variant="filled" size="40" onClick={toggleScheduleInvite}>Schedule Interview</Button>,
            done: false
        },
        {
            id: 3,
            text: "Make an offer to this shortlisted candidate",
            title: "Make Job Offer",
            content: <Fragment></Fragment>,
            done: false
        },
        {
            id: 4,
            text: "To view this employees documents, you need to make a request.",
            title: "Request Document Access",
            content: <Fragment></Fragment>,
            done: false
        },
    ]
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Track Progress</h1>
                <p className="text-base text-gray-400">Track and manage the progress of this job</p>
            </div>
            <span className="font-medium text-base text-gray-900">{job?.title}</span>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                            <span aria-hidden="true" className={cn("absolute left-4 top-4 -ml-1 h-full w-0.5", event.done ? "bg-primary-500" : "bg-gray-200")} />
                        ) : null}
                        <div className="relative flex space-x-3">
                            <div>
                                <span
                                    className={cn("flex size-6 items-center justify-center rounded-full ring-8 ring-white", event.done ? "bg-primary-500" : "bg-[#A1AEBE]")}
                                >
                                    <Icon icon="ri:check-line" className="size-5 text-white" />
                                </span>
                            </div>
                            <div className="grid gap-2.5">
                                <div className="flex flex-col min-w-0 gap-1.5">
                                    <h5 className="font-medium text-sm text-gray-800">{event.title}</h5>
                                    <p className="text-sm text-gray-500">{event.text}</p>
                                </div>
                                {event.content}
                            </div>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
            <ScheduleInterview isOpen={toggleModals.openScheduleInvite} close={toggleScheduleInvite} />
        </motion.div>
    )
}