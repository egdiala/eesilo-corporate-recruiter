import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { useGetNotifications } from "@/services/hooks/queries"
import { useLocation } from "react-router-dom"
import { getPaginationParams } from "@/hooks/usePaginationParams"

export const NotificationsPage: React.FC = () => {
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const  { isFetching } = useGetNotifications({ page: page.toString(), item_per_page: itemsPerPage.toString() })


    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location, setPage])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-scroll">
            <RenderIf condition={!isFetching}>
                <div className="flex flex-col gap-5 bg-white rounded-2xl lg:p-8">
                    {
                        Array.from({ length: 2 }).map((_,index) =>
                            <div key={index} className="flex items-center gap-3.5 p-4 flex-1">
                                <div className="grid place-content-center p-1.5 rounded-full border border-gray-200">
                                    <Icon icon="uil:bell" className="size-5 text-gray-600" />
                                </div>
                                <div className="grid gap-1 flex-1">
                                    <h2 className="font-medium text-sm text-gray-900">Notification Title</h2>
                                    <p className="text-xs text-gray-600">Insert the content description here.</p>
                                </div>
                                <div className="flex items-end flex-col text-right text-xs text-gray-600">
                                    Today<br />
                                    02:33 pm
                                </div>
                            </div>
                        )
                    }
                </div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </motion.div>
    )
}