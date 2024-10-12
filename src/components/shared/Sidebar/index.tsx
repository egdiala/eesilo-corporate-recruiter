import React, { Fragment, useMemo } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { format, isAfter, startOfToday } from "date-fns"
import topStatus from "@/assets/top_status.svg"
import { removeItem } from "@/utils/localStorage"
import { Link, useNavigate } from "react-router-dom"
import { NavItem, RenderIf } from "@/components/core"
import type { FetchedAccount } from "@/types/account"
import companyAvatar from "@/assets/company_avatar.svg"
import logoGreenWhite from "@/assets/logo_green_white.svg"
import { appRoutes, otherRoutes } from "@/constants/routes"
import { useGetEventCalendar } from "@/services/hooks/queries"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"

interface SidebarProps {
    admin: FetchedAccount;
    notificationCount: number;
    showSidebar: boolean;
    close: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ admin, close, notificationCount }) => {
    const navigate = useNavigate()
    let today = startOfToday()
    const currentMonth = format(today, "MMM-yyyy")
    const { data: fetchedEvents } = useGetEventCalendar({ year_month: format(currentMonth, "yyyy-MM") })
    
    const logOut = () => {
        removeItem(APP_TOKEN_STORAGE_KEY);
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login");
    }

    const eventsCount = useMemo(() => {
        const futureEvents = fetchedEvents?.filter((event) => isAfter(event?.event_schedule, today))
        return futureEvents?.length
    },[fetchedEvents, today])

    const newAppRoutes = useMemo(() => {
        return appRoutes.map((item) => item.name === "Calendar" ? ({ to: item.to, name: item.name, icon: item.icon, count: eventsCount }) : item)
    },[eventsCount])

    const newOtherRoutes = useMemo(() => {
        return otherRoutes.map((item) => item.name === "Notifications" ? ({ to: item.to, name: item.name, icon: item.icon, count: notificationCount }) : item)
    }, [notificationCount])
    
    const imageUrl = `${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/user/fnviewers/${admin?.avatar}`
    return (
        <Fragment>
            <div className="grid gap-6">
                <img src={logoGreenWhite} className="w-full" alt="neesilo_green_logo" />
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    {
                        newAppRoutes.map((route) => 
                            <NavItem key={route.name} close={close} {...route} />
                        )
                    }
                </div>
            </div>
            <div className="grid gap-8">
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    {
                        newOtherRoutes.map((route) => 
                            <NavItem key={route.name} close={close} {...route} />
                        )
                    }
                    <button type="button" className="flex items-center p-3 gap-4 text-warning-400" onClick={() => logOut()}>
                        <Icon icon="uil:sign-out-alt" className="size-5" />
                        <span className="font-medium text-base">Logout</span>
                    </button>
                </div>
                <Link to="/profile" className="flex items-center gap-2 p-3" onClick={close}>
                    <div className="size-10 relative">
                        <img src={admin?.avatar ? imageUrl : companyAvatar} className="size-10 rounded-full object-cover" alt={admin?.name} />
                        <RenderIf condition={admin?.status === 1}>
                            <img src={topStatus} className="absolute -top-0.5 -right-1.5" alt="top-status" />
                        </RenderIf>
                    </div>
                    <div className="flex-1 grid gap-1">
                        <h3 className="font-medium text-sm/4 text-white line-clamp-1 capitalize">{admin?.name}</h3>
                        <span className="font-medium text-xs text-gray-300 line-clamp-1 capitalize">Company</span>
                    </div>
                </Link>
            </div>
        </Fragment>
    )
}

export const Sidebar: React.FC<SidebarProps> = ({ admin, close, showSidebar, notificationCount }) => {
    return (
        <Fragment>
            <nav className={cn("bg-[#003449] hidden xl:flex flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 xl:fixed inset-y-0 z-20 overflow-y-scroll justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500")}>
                <SidebarContent notificationCount={notificationCount} admin={admin} showSidebar={showSidebar} close={close} />
            </nav>
            <nav className={cn("bg-[#003449] flex xl:hidden flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 absolute xl:relative inset-y-0 z-20 overflow-y-scroll justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500", showSidebar ? "translate-x-0" : "-translate-x-full")}>
                <SidebarContent notificationCount={notificationCount} admin={admin} showSidebar={showSidebar} close={close} />
            </nav>
        </Fragment>
    );
};