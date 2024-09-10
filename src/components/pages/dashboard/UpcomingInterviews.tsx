import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Avatar, ContentDivider } from "@/components/core";

export const UpcomingInterviews: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 py-0.5">
                    <Icon icon="ri:calendar-2-line" className="size-6 text-warning-500" />
                    <h3 className="font-medium text-base text-gray-900">Upcoming Interviews</h3>
                </div>
                <Link to="/jobs" className="font-medium text-sm text-gray-500">View All</Link>
            </div>
            <ContentDivider />
            {
                Array.from({ length: 4 }).map((_, index) =>
                    <div key={index} className="flex items-start justify-between p-1">
                        <div className="flex items-center gap-4">
                            <Avatar size="40" alt="user" image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <div className="grid gap-1">
                                <h1 className="font-medium text-sm text-gray-900">Interview Call with Kyle</h1>
                                <p className="text-sm text-gray-600">Zoom Call</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-600">Today, 2:13pm</span>
                    </div>
                )
            }
        </div>
    )
}