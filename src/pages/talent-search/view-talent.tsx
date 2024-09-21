import React, { Fragment } from "react"
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "framer-motion"
import { Button, RenderIf } from "@/components/core"
import { useNavigate, useParams } from "react-router-dom"
import { pageVariants } from "@/constants/animateVariants"
import { useGetTalent } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import type { SingleTalent } from "@/types/applicants"
import { TalentInformation } from "@/components/pages/talent"

export const ViewTalentPage: React.FC = () => {
    const { id: talentId } = useParams()
    const navigate = useNavigate()
    const { data: talent, isFetching } = useGetTalent<SingleTalent>(talentId as string)
    
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
                            <div className="flex-1">
                                <AnimatePresence mode="popLayout">
                                    <TalentInformation talent={talent!} />
                                </AnimatePresence>
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