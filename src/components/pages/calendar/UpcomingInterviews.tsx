import React, { useMemo } from "react";
import { Avatar, Button, ContentDivider } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { cn } from "@/libs/cn";

interface UpcomingInterviewsProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ isOpen, onClose }) => {
    const interviews = [1, 2, 3, 4, 5]
    
    const interviewColumns = useMemo(() => {
        if (interviews.length === 1) {
            return "grid-cols-1"
        }
        if (interviews.length === 2) {
            return "grid-cols-3"
        }
        if (interviews.length > 2) {
            return "grid-cols-3"
        }
    },[interviews.length])
    
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
                                interviews.map((item) =>
                                    <div key={item} className="flex flex-col gap-3 border border-gray-200 bg-gray-25 rounded-xl p-4">
                                        <div className="grid gap-5">
                                            <h2 className="font-semibold text-base text-gray-900">Certified Health Worker</h2>
                                            <div className="flex items-center gap-3">
                                                <Avatar size="40" image="https://images.pexels.com/photos/7275354/pexels-photo-7275354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ferdinard Tabitha" />
                                                <div className="grid gap-1">
                                                    <h3 className="font-medium text-sm text-gray-900">Ferdinard Tabitha</h3>
                                                    <p className="text-xs text-gray-600">Human Resources, Feh Medicals</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ContentDivider />
                                        <ul className="grid gap-1.5">
                                            <li>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Date:</div>
                                                    <div className="font-medium text-sm text-gray-500">12 January 2023</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Time:</div>
                                                    <div className="font-medium text-sm text-gray-500">12:00 PM GMT</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-start gap-1.5 overflow-hidden text-ellipsis">
                                                    <div className="font-medium text-sm text-gray-700 w-[5.375rem]">Meeting link:</div>
                                                    <a href="#" className="flex-1 whitespace-pre-wrap line-clamp-1 font-medium text-sm text-blue-500">zoommtg://zoom.us/join?confno=8529015944&pwd=&uname=Nobody%20-%2051800000000</a>
                                                </div>
                                            </li>
                                        </ul>
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