import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import emptyState from "@/assets/empty_state.webp";

export const RecentJobUpdates: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 py-0.5">
                    <Icon icon="ri:file-text-line" className="size-6 text-primary-500" />
                    <h3 className="font-medium text-base text-gray-900">Recent Job Updates</h3>
                </div>
                <Link to="/jobs" className="font-medium text-sm text-gray-500">View All</Link>
            </div>
            <hr className="border-[#E2E4E9]" />
            <div className="flex flex-col items-center gap-2 py-14">
                <img src={emptyState} alt="emptyState" className="size-24" />
                <div className="grid gap-1 text-center">
                    <h2 className="font-medium text-base text-gray-900">You have no uploaded documents</h2>
                    <p className="text-sm text-gray-600">Upload your documents to get them verified</p>
                </div>
            </div>
        </div>
    )
}