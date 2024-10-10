import React, { Fragment, useCallback, useMemo, useState } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { format, isPast } from "date-fns"
import type { FetchedJob } from "@/types/jobs"
import { JobOfferModal } from "./JobOfferModal"
import { Button, RenderIf } from "@/components/core"
import { tabVariants } from "@/constants/animateVariants"
import { ScheduleInterview } from "../talent/ScheduleInterview"
import { useShortlistApplicant } from "@/services/hooks/mutations"
import type { FetchedShortlistedCandidate } from "@/types/applicants"

interface JobProgressProps {
    job: FetchedJob
    talent: FetchedShortlistedCandidate
}

export const JobProgress: React.FC<JobProgressProps> = ({ job, talent }) => {
    const [message, setMessage] = useState("")
    const { mutate, isPending } = useShortlistApplicant(message, () => close())
    const [toggleModals, setToggleModals] = useState({
        openScheduleInvite: false,
        openSendJobOffer: false
    })

    const toggleScheduleInvite = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openScheduleInvite: !toggleModals.openScheduleInvite,
      }))
    }, [toggleModals.openScheduleInvite])

    const toggleJobOffer = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openSendJobOffer: !toggleModals.openSendJobOffer,
      }))
    }, [toggleModals.openSendJobOffer])
    
    const sendInvite = () => {
        setMessage(`Job invitation sent to ${talent?.user_data?.first_name} ${talent?.user_data?.last_name}`)
        mutate({
            job_id: job?.job_id,
            user_id: talent?.user_id,
            invite_status: "1"
        })
    }

    const interviewData = useMemo(() => {
        if (talent?.interview_data?.i_schedule) {
            return [
                { label: "Date", value: format(talent?.interview_data?.i_date as string, "dd MMMM yyyy") },
                { label: "Time", value: format(talent?.interview_data?.i_schedule as Date, "hh:mm a O") },
                (!!talent?.interview_data?.i_link && {
                    label: "Meeting link",
                    value: <Fragment>
                        <RenderIf condition={!isPast(talent?.interview_data?.i_schedule)}>
                            <a href={talent?.interview_data?.i_link} target="_blank" className="w-96 whitespace-pre-wrap line-clamp-1 font-medium text-sm text-blue-500">{talent?.interview_data?.i_link}</a>
                        </RenderIf>
                        <RenderIf condition={isPast(talent?.interview_data?.i_schedule)}>
                            <div className="flex items-center py-0.5 font-medium text-xs text-[#8F5F00] px-2 bg-[#FFF8DF] rounded-full w-fit">Expired</div>
                        </RenderIf>
                    </Fragment>
                }),
                (!!talent?.interview_data?.i_comment && { label: "Note", value: talent?.interview_data?.i_comment })
            ].filter((item) => item !== false)
        }
        return []
    },[talent?.interview_data?.i_comment, talent?.interview_data?.i_date, talent?.interview_data?.i_link, talent?.interview_data?.i_schedule])

    const timeline = useMemo(() => {
        return [
            {
                id: 1,
                text: talent?.invite_status === 0 ? "You can send a job invitation to this employee" : "You have sent a job invitation to this employee",
                title: talent?.invite_status === 0 ? "Send Job Invitation" : "Job Invitation Sent",
                content: <RenderIf condition={talent?.invite_status === 0}>
                    <div className="w-32">
                        <Button type="button" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending} onClick={sendInvite} block>Send Invitation</Button>
                    </div>
                </RenderIf>,
                done: talent?.invite_status !== 0
            },
            (((talent?.invite_status === 3) || (talent?.invite_status === 2)) && ({
                id: 1,
                text: talent?.invite_status === 2 ? "Job invitation has been declined by this candidate" : "Wait for candidate to accept or decline your invite",
                title: talent?.invite_status === 2 ? "Declined Invitation" : "Pending Acceptance",
                content: <Fragment />,
                failed: talent?.invite_status === 2
            })),
            {
                id: 2,
                text: (talent?.invite_status <= 1) && (talent?.interview_status === 0) ? "You can schedule an interview with this employee" : "You have scheduled an interview with this employee",
                title: "Schedule Interview",
                content: <div>
                    <RenderIf condition={(talent?.invite_status == 1) && (talent?.interview_status === 0)}>
                        <Button type="button" theme="primary" variant="filled" size="40" onClick={toggleScheduleInvite}>Schedule Interview</Button>
                    </RenderIf>
                    <RenderIf condition={((talent?.invite_status <= 1) && (talent?.interview_status !== 0))}>
                        <ul className="space-y-1.5">
                            {
                                interviewData.map((item) =>
                                <li>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-24 text-gray-700 font-medium text-sm">{item?.label}:</span>
                                        <span className="flex-1 text-gray-500 font-medium text-sm w-96 line-clamp-3">{item?.value}</span>
                                    </div>
                                </li>
                                )
                            }
                        </ul>
                    </RenderIf>
                </div>,
                done: ((talent?.invite_status <= 1) && (talent?.interview_status !== 0))
            },
            {
                id: 3,
                text: talent?.offer_status === 0 ? "Make an offer to this shortlisted candidate" : "You have made a job offer. Click here to view. ",
                title: talent?.offer_status === 0 ? "Make Job Offer" : "Offer Made",
                content: <Fragment>
                        <RenderIf condition={isPast(talent?.interview_data?.i_schedule as string | Date) && talent?.offer_status === 0}>
                            <Button type="button" theme="primary" variant="filled" size="40" onClick={toggleJobOffer}>Make Job Offer</Button>
                        </RenderIf>
                        <RenderIf condition={talent?.offer_status === 3}>
                            <div className="text-xs font-medium bg-blue-25 text-blue-500 px-2 flex rounded-full w-fit">Offer sent, wait for response</div>
                        </RenderIf>
                </Fragment>,
                done: talent?.offer_status === 3
            },
            {
                id: 4,
                text: "To view this employees documents, you need to make a request.",
                title: "Request Document Access",
                content: <Fragment></Fragment>,
                done: false
            },
        ].filter((item) => item !== false)
    }, [interviewData, talent?.interview_data?.i_schedule, talent?.interview_status, talent?.invite_status])
    
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
            <JobOfferModal applicationId={talent?.application_id} isOpen={toggleModals.openSendJobOffer} onClose={toggleJobOffer} />
            <ScheduleInterview job={job} talent={talent} isOpen={toggleModals.openScheduleInvite} close={toggleScheduleInvite} />
        </motion.div>
    )
}