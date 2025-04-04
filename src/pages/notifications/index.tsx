import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { EmptyState, RenderIf } from "@/components/core"
import { useLocation } from "react-router-dom"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { useGetNotifications } from "@/services/hooks/queries"
import type { FetchedNotification, NotificationCount } from "@/types/notification"
import { getPaginationParams } from "@/hooks/usePaginationParams"
import { format, formatDistanceToNow } from "date-fns"
import { useReadNotifications } from "@/services/hooks/mutations"
import { cn } from "@/libs/cn"

export const NotificationsPage: React.FC = () => {
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const  { data: notifications, isLoading } = useGetNotifications<FetchedNotification[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { isLoading: fetchingCount } = useGetNotifications<NotificationCount>({ component: "count", page: page.toString(), item_per_page: itemsPerPage.toString() })
    const { mutate } = useReadNotifications()


    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location, setPage])

    useEffect(() => {
        if (notifications?.some((item) => item?.status !== 1)) {
            mutate()
        }
    },[notifications])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-scroll">
            <RenderIf condition={notifications !== undefined}>
                <div className="flex flex-col gap-5 bg-white rounded-2xl lg:p-8">
                    <RenderIf condition={notifications?.length! > 0}>
                        {
                            notifications?.map((notification) =>
                                <div key={notification?.notification_id} className={cn("flex items-center gap-3.5 p-4 flex-1 rounded-xl", notification.status === 1 ? "bg-white" : "bg-gray-25")}>
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
                    </RenderIf>
                    <RenderIf condition={notifications?.length! === 0}>
                        <EmptyState emptyStateText="You don't have any notifications" />
                    </RenderIf>
                </div>
            </RenderIf>
            <RenderIf condition={(isLoading || fetchingCount) && notifications === undefined}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </motion.div>
    )
}