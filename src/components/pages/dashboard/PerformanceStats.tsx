import React from "react";
import { Icon } from "@iconify/react";
import emptyState from "@/assets/empty_state.webp";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const PerformanceStats: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-base text-gray-800">Performance</h3>
                <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-md p-0 focus:outline-none data-[focus]:outline-0">
                        <span className="font-medium text-base text-gray-600">2024</span>
                        <Icon icon="ri:arrow-down-s-line" className="size-6 text-gray-900" />
                    </MenuButton>

                    <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-20 origin-top-right rounded-xl drop-shadow-2xl shadow-2xl bg-white p-1 text-sm/6 text-gray-600 transition duration-300 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                            2023
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                            2024
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
            <div className="flex items-center justify-end uppercase font-medium text-xs text-primary-500">Generate Report</div>
            <div className="flex items-center">
                <div className="flex flex-col p-5 gap-5">
                    <span className="font-medium text-sm text-[#475569]">From Jan 2024 to July 2024</span>
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Invited</span>
                            <h4 className="font-semibold text-3xl text-blue-500">0</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Accepted</span>
                            <h4 className="font-semibold text-3xl text-success-500">0</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Rejected</span>
                            <h4 className="font-semibold text-3xl text-success-500">0</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Hired</span>
                            <h4 className="font-semibold text-3xl text-warning-500">0</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 py-14 flex-1">
                    <img src={emptyState} alt="emptyState" className="size-24" />
                    <div className="grid gap-1 text-center">
                        <h2 className="font-medium text-base text-gray-900">You have no performance metrics</h2>
                        <p className="text-sm text-gray-600">Create jobs and interact with candidates to view metrics</p>
                    </div>
                </div>
            </div>
        </div>
    )
}