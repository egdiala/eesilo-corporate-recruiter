import React from "react";
import { Icon } from "@iconify/react";

export const PerformanceStats: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-base text-gray-800">Performance</h3>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-base text-gray-600">2024</span>
                    <Icon icon="ri:arrow-down-s-line" className="size-6 text-gray-900" />
                </div>
            </div>
            <div className="flex items-center justify-end uppercase font-medium text-xs text-primary-500">Generate Report</div>
            <div className="flex items-center">
                <div className="flex flex-col p-5 gap-5">
                    <span className="font-medium text-sm text-[#475569]">From Jan 2024 to July 2024</span>
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Invited</span>
                            <h4 className="font-semibold text-3xl text-blue-500">204</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Accepted</span>
                            <h4 className="font-semibold text-3xl text-success-500">204</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Rejected</span>
                            <h4 className="font-semibold text-3xl text-success-500">204</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Hired</span>
                            <h4 className="font-semibold text-3xl text-warning-500">204</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}