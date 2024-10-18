import React, { Fragment, useEffect, useMemo } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { Button, RenderIf } from "@/components/core"
import type { SingleTalent } from "@/types/applicants"
import { AnimatePresence, motion } from "framer-motion"
import { useGetTalent } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"

export const ViewEmployeePage: React.FC = () => {
    const { id: talentId } = useParams()
    const navigate = useNavigate()
    const { data: talent, isFetching } = useGetTalent<SingleTalent>(talentId as string)
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Candidate’s Information",
                href: `/employees/view/${talentId}/information`
            },
            {
                id: 2,
                label: "Documents",
                href: `/employees/view/${talentId}/documents`
            },
            {
                id: 3,
                label: "Active Job Roles",
                href: `/employees/view/${talentId}/active-roles`
            },
        ]
    }, [talentId])
    
    useEffect(() => {
    if (!talent?.user_id && !isFetching) {
      navigate("/employees")
    }
    },[isFetching, navigate, talent?.user_id])
    
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
                    <div className="flex flex-col gap-0 view-page-container overflow-hidden">
                        <div className="flex items-center gap-2.5 py-5 px-8 border-b border-b-gray-200 bg-white">
                            <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate("/talent")}>
                                <Icon icon="ri:arrow-left-s-line" className="size-5" />
                                Back
                            </Button>
                            <h1 className="text-lg text-gray-900 capitalize">{talent?.first_name} {talent?.last_name}</h1>
                        </div>
                        <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px:4 lg:px-8 pt-5 pb-10">
                            <div className="relative flex items-start gap-5 bg-white rounded-2xl p-4 lg:p-8">
                                <div className="sticky top-0 flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                                    <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile menu</div>
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
                    </div>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}