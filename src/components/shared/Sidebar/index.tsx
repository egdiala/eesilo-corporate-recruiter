import React, { Fragment } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { NavItem, RenderIf } from "@/components/core"
import topStatus from "@/assets/top_status.svg"
import { removeItem } from "@/utils/localStorage"
import { Link, useNavigate } from "react-router-dom"
import type { FetchedAccount } from "@/types/account"
import companyAvatar from "@/assets/company_avatar.svg"
import logoGreenWhite from "@/assets/logo_green_white.svg"
import { appRoutes, otherRoutes } from "@/constants/routes"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"

interface SidebarProps {
    admin: FetchedAccount;
    showSidebar: boolean;
    close: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ admin, close }) => {
    const navigate = useNavigate()
    const logOut = () => {
        removeItem(APP_TOKEN_STORAGE_KEY);
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login");
    }
    return (
        <Fragment>
            <div className="grid gap-6">
                <img src={logoGreenWhite} className="w-full" alt="neesilo_green_logo" />
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    {
                        appRoutes.map((route) => 
                            <NavItem key={route.name} close={close} {...route} />
                        )
                    }
                </div>
            </div>
            <div className="grid gap-8">
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    {
                        otherRoutes.map((route) => 
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
                        <img src={admin?.avatar ?? companyAvatar} className="size-10 rounded-full object-cover" alt={admin?.name} />
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

export const Sidebar: React.FC<SidebarProps> = ({ admin, close, showSidebar }) => {
    return (
        <Fragment>
            <nav className={cn("bg-[#003449] hidden xl:flex flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 xl:fixed inset-y-0 z-20 overflow-y-scroll justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500")}>
                <SidebarContent admin={admin} showSidebar={showSidebar} close={close} />
            </nav>
            <nav className={cn("bg-[#003449] flex xl:hidden flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 absolute xl:relative inset-y-0 z-20 overflow-y-scroll justify-between left-0 border-r border-r-gray-200 transition transform ease-out duration-500", showSidebar ? "translate-x-0" : "-translate-x-full")}>
                <SidebarContent admin={admin} showSidebar={showSidebar} close={close} />
            </nav>
        </Fragment>
    );
};