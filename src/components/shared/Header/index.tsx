import React from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { NavLink } from "react-router-dom"
import { RenderIf } from "@/components/core"
import { useRouteTitle } from "@/hooks/useRouteTitle"

interface HeaderProps {
    setShowSidebar: () => void;
    notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({ setShowSidebar, notificationCount }) => {

    const routeTitle = useRouteTitle()
    return (
        <header className="flex items-center gap-3 sticky top-0 left-0 right-0 bg-white border-b border-b-gray-200 py-3 md:py-5 px-4 md:px-8">
            <button type="button" className="group xl:hidden grid place-content-center size-10 rounded-lg hover:bg-gray-100 transition ease-out duration-300" onClick={setShowSidebar}>
                <div className="relative">
                    <Icon icon="ri:menu-line" className="size-5 text-gray-500 group-focus:text-primary-500" />
                </div>
            </button>
            <div className="flex-1 font-semibold text-lg md:text-xl line-clamp-1 text-gray-900">{routeTitle}</div>
            <NavLink to="/talent">
                {({ isActive }) => (
                    <div className={cn("group grid place-content-center size-10 rounded-lg transition ease-out duration-300", isActive ? "bg-gray-100" : "bg-white")}>
                        <div className="relative">
                            <Icon icon="ri:search-2-line" className={cn("size-5", isActive ? "text-primary-500" : "text-gray-500")} />
                        </div>
                    </div>
                )}
            </NavLink>
            <NavLink to="/notifications">
                {({ isActive }) => (
                    <div className={cn("group grid place-content-center size-10 rounded-lg transition ease-out duration-300", isActive ? "bg-gray-100" : "bg-white")}>
                        <div className="relative">
                            <Icon icon="ri:notification-3-line" className={cn("size-5", isActive ? "text-primary-500" : "text-gray-500")} />
                            <RenderIf condition={notificationCount > 0}>
                                <span className="absolute top-0 right-0 bg-error-500 size-2 rounded border-2 border-white" />
                            </RenderIf>
                        </div>
                    </div>
                )}
            </NavLink>
        </header>
    )
}