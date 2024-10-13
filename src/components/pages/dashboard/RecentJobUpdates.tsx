import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import emptyState from "@/assets/empty_state.webp";
import { ContentDivider, RenderIf } from "@/components/core";
import { FetchedNotification } from "@/types/notification";
import { format, formatDistanceToNow } from "date-fns";

interface RecentJobUpdatesProps {
    notifications: FetchedNotification[]
}

export const RecentJobUpdates: React.FC<RecentJobUpdatesProps> = ({ notifications }) => {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 py-0.5">
                    <Icon icon="ri:file-text-line" className="size-6 text-primary-500" />
                    <h3 className="font-medium text-base text-gray-900"><span className="sr-only md:not-sr-only">Recent </span>Job Updates</h3>
                </div>
                <Link to="/notifications" className="font-medium text-sm text-gray-500">View All</Link>
            </div>
            <ContentDivider />
            <RenderIf condition={notifications?.length > 0}>
                <div className="flex flex-col gap-2">
                    {
                        notifications?.map((notification) =>
                            <div key={notification?.notification_id} className="flex items-center gap-3.5 px-4 flex-1 rounded-xl">
                                <div className="grid place-content-center p-1.5 rounded-full bg-white border border-gray-200">
                                    <Icon icon="uil:bell" className="size-5 text-gray-600" />
                                </div>
                                <div className="grid gap-1 flex-1">
                                    <h2 className="font-medium text-sm text-gray-900">{notification?.title}</h2>
                                    <p className="text-xs text-gray-600">{notification?.description}</p>
                                </div>
                                <div className="flex items-end flex-col text-right text-xs text-gray-600">
                                    <span>{formatDistanceToNow(notification?.createdAt, { addSuffix: true })}</span>
                                    <p className="lowercase">{format(notification?.createdAt, "p")}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </RenderIf>
            <RenderIf condition={notifications?.length === 0}>
                <div className="flex flex-col items-center gap-2 py-14">
                    <img src={emptyState} alt="emptyState" className="size-24" />
                    <div className="grid gap-1 text-center">
                        <h2 className="font-medium text-base text-gray-900">You have no uploaded documents</h2>
                        <p className="text-sm text-gray-600">Upload your documents to get them verified</p>
                    </div>
                </div>
            </RenderIf>
        </div>
    )
}