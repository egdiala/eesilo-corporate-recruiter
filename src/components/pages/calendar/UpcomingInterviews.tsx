import React, { useMemo } from "react";
import { cn } from "@/libs/cn";
import type { FetchedCalendarEvent } from "@/types/account";
import { Avatar, Button, ContentDivider, RenderIf } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { format, isPast } from "date-fns";

interface UpcomingInterviewsProps {
    isOpen: boolean;
    onClose: () => void;
    events: FetchedCalendarEvent[]
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ events, isOpen, onClose }) => {
    
    const interviewColumns = useMemo(() => {
        if (events?.length === 1) {
            return "grid-cols-1"
        }
        if (events?.length === 2) {
            return "grid-cols-2"
        }
        if (events?.length > 2) {
            return "grid-cols-3"
        }
    },[events?.length])
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="flex flex-col gap-6 min-w-[45.9375rem] max-w-[69rem] p-8 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex items-center gap-4 justify-between">
                            <DialogTitle as="h1" className="flex-1 text-lg font-medium text-gray-900">
                                Upcoming Interviews
                            </DialogTitle>
                            <Button type="button" theme="error" variant="lighter" size="36" onClick={onClose}>Dismiss</Button>
                        </div>
                        <div className={cn("grid gap-5", interviewColumns)}>
                            {
                                events?.map((item) =>
                                    <div key={item?._id} className="flex flex-col gap-3 border border-gray-200 bg-gray-25 rounded-xl p-4">
                                        <div className="grid gap-5">
                                            <h2 className="font-semibold text-base text-gray-900">{item?.title}</h2>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="40" image={item?.user_data?.avatar} alt={`${item?.user_data?.first_name} ${item?.user_data?.last_name}`} />
                                                <div className="grid gap-1">
                                                    <h3 className="font-medium text-sm text-gray-900">{item?.user_data?.first_name} {item?.user_data?.last_name}</h3>
                                                    <p className="text-xs text-gray-600">{item?.user_data?.specialty_title}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ContentDivider />
                                        <ul className="grid gap-1.5">
                                            <li>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Date:</div>
                                                    <div className="font-medium text-sm text-gray-500">{format(item?.event_schedule, "dd MMMM yyyy")}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Time:</div>
                                                    <div className="font-medium text-sm text-gray-500">{format(item?.event_schedule, "p")} {format(item?.event_schedule, "OOOO")}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-start gap-1.5 overflow-hidden text-ellipsis">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Meeting link:</div>
                                                    <RenderIf condition={!isPast(item?.event_schedule)}>
                                                        <a href={item?.data?.meeting_link} target="_blank" className="flex-1 whitespace-pre-wrap line-clamp-1 font-medium text-sm text-blue-500">{item?.data?.meeting_link}</a>
                                                    </RenderIf>
                                                    <RenderIf condition={isPast(item?.event_schedule)}>
                                                        <div className="flex items-center py-0.5 font-medium text-xs text-[#8F5F00] px-2 bg-[#FFF8DF] rounded-full w-fit">Expired</div>
                                                    </RenderIf>
                                                </div>
                                            </li>
                                        </ul>
                                        <ContentDivider />
                                        <RenderIf condition={!!item?.comment}>
                                            <div className="font-normal text-xs text-gray-600">{item?.comment}</div>
                                        </RenderIf>
                                    </div>
                                )
                            }
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}