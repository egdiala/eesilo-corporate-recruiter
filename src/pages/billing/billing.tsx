import React, { useEffect, useMemo } from "react"
import { cn } from "@/libs/cn"
import { AnimatePresence, motion } from "framer-motion"
import { pageVariants } from "@/constants/animateVariants"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

export const BillingPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Plans",
                href: "/billings/plans"
            },
            {
                id: 2,
                label: "Payment Methods",
                href: "/billings/payment-methods"
            },
            {
                id: 3,
                label: "Billing History",
                href: "/billings/history"
            },
        ]
    },[])
    
    useEffect(() => {
    if (location.pathname === "/billings") {
      navigate(tabs[0].href)
    }
    },[location.pathname, navigate, tabs])
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-0 view-page-container overflow-hidden">
            <div className="flex-1 flex-col overflow-y-scroll view-page-container px:4 lg:px-8 pt-5 pb-10">
                <div className="relative flex items-start gap-5 bg-white rounded-2xl p-4 lg:p-8">
                    <div className="sticky top-0 flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                        <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Billing & subscription</div>
                        <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll">
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
                    <div className="flex-1">
                        <AnimatePresence mode="popLayout">
                            <Outlet />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}