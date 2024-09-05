import React from "react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Icon } from "@iconify/react"

const timeline = [
  {
    id: 1,
    content: "You have sent a job invitation to this employee",
    target: "Job Invitation Sent",
  },
  {
    id: 2,
    content: "You can schedule an interview with this employee",
    target: "Schedule Interview",
  },
  {
    id: 3,
    content: "Make an offer to this shortlisted candidate",
    target: "Make Job Offer",
  },
  {
    id: 4,
    content: "To view this employees documents, you need to make a request.",
    target: "Request Document Access",
  },
]

export const JobProgress: React.FC = () => {
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Track Progress</h1>
                <p className="text-base text-gray-400">Track and manage the progress of this job</p>
            </div>
            <span className="font-medium text-base text-gray-900">Certified Health Worker</span>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                            <span aria-hidden="true" className="absolute left-4 top-4 -ml-1 h-full w-0.5 bg-gray-200" />
                        ) : null}
                        <div className="relative flex space-x-3">
                            <div>
                                <span
                                    className="flex size-6 items-center justify-center rounded-full ring-8 ring-white bg-primary-500"
                                >
                                    <Icon icon="ri:check-line" className="size-5 text-white" />
                                </span>
                            </div>
                            <div className="flex flex-col min-w-0 gap-1.5">
                                <h5>{event.target}</h5>
                                <p className="text-sm text-gray-500">
                                {event.content}
                                </p>
                            </div>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}