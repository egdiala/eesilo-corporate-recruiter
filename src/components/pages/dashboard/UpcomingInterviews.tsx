import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import emptyState from "@/assets/empty_state.webp";
import { capitalizeWords } from "@/utils/capitalize";
import { format, formatDistanceToNow } from "date-fns";
import { InterviewDataCountType } from "@/types/dashboard";
import { Avatar, ContentDivider, RenderIf } from "@/components/core";

interface UpcomingInterviewsProps {
    interviews: InterviewDataCountType[]
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ interviews }) => {
    const imageUrl = `${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/user/fnviewers/`
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 py-0.5">
                    <Icon icon="ri:calendar-2-line" className="size-6 text-warning-500" />
                    <h3 className="font-medium text-base text-gray-900"><span className="sr-only md:not-sr-only">Upcoming </span>Interviews</h3>
                </div>
                <Link to="/calendar" className="font-medium text-sm text-gray-500">View All</Link>
            </div>
            <ContentDivider />
            <RenderIf condition={interviews.length > 0}>
                {
                    interviews?.map((interview) =>
                        <div key={interview?.user_data?._id} className="flex items-start justify-between p-1">
                            <div className="flex items-center gap-4">
                                <Avatar size="40" alt="user" image={interview?.user_data?.avatar ? `${imageUrl}${interview?.user_data?.avatar}` : interview?.user_data?.avatar} />
                                <div className="grid gap-1">
                                    <h1 className="font-medium text-sm text-gray-900">Interview Call with {capitalizeWords(interview?.user_data?.first_name)}</h1>
                                    <p className="text-sm text-gray-600">Online Call</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-600 capitalize">{formatDistanceToNow(interview?.interview_data?.i_schedule, { addSuffix: true })}, {format(interview?.interview_data?.i_schedule, "p")}</span>
                        </div>
                    )
                }
            </RenderIf>
            <RenderIf condition={interviews.length === 0}>
                <div className="flex flex-col items-center gap-2 py-14">
                    <img src={emptyState} alt="emptyState" className="size-24" />
                    <div className="grid gap-1 text-center">
                        <h2 className="font-medium text-base text-gray-900">You have no upcoming interviews</h2>
                        <p className="text-sm text-gray-600">Schedule interviews with candidates to view them here</p>
                    </div>
                </div>
            </RenderIf>
        </div>
    )
}