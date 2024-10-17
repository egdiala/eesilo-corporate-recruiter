import React, { useEffect, useMemo } from "react";
import { cn } from "@/libs/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useGetAccount } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";

export const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isFetching } = useGetAccount()
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Security",
                href: "/settings/security"
            },
            {
                id: 2,
                label: "Staff & Access Control",
                href: "/settings/staff-access"
            }
        ]
    }, [])
    
    useEffect(() => {
        if (location.pathname === "/settings") {
            navigate("/settings/security")
        }
    },[location.pathname, navigate])
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="grid md:flex flex-col md:flex-row gap-5 bg-white rounded-2xl p-4 lg:p-8">
                <div className="flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 scrollbar-hide rounded-2xl w-full max-w-96 md:max-w-72">
                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Select menu</div>
                    <div className="flex md:flex-col flex-row gap-2 scrollbar-hide overflow-x-scroll">
                    {
                        tabs.map((tab) =>
                            <NavLink to={tab.href} key={tab.id}>
                            {({ isActive }) => (
                                <div className={cn("flex whitespace-nowrap rounded-lg p-2 text-sm font-medium focus:outline-none group transition duration-500 ease-out", isActive ? "bg-primary-500 outline-0" : "hover:bg-gray-100")}>
                                    <span className={cn("flex-1", !isActive && "group-hover:text-gray-900", isActive ? "text-white" : "text-gray-500")}>{tab.label}</span>
                                </div>
                            )}
                            </NavLink>
                        )
                    }
                    </div>
                </div>
                <RenderIf condition={!isFetching}>
                    <div className="max-w-xl w-full flex-1">
                        <AnimatePresence mode="popLayout">
                            <Outlet />
                        </AnimatePresence>
                    </div>
                </RenderIf>
                <RenderIf condition={isFetching}>
                    <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}