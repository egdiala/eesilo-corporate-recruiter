import React from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { NavItem } from "@/components/core"
import { removeItem } from "@/utils/localStorage"
import { Link, useNavigate } from "react-router-dom"
import blankImg from "@/assets/company_recruiter.png"
import logoGreenWhite from "@/assets/logo_green_white.svg"
import { appRoutes, otherRoutes } from "@/constants/routes"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"


export const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const logOut = () => {
        removeItem(APP_TOKEN_STORAGE_KEY);
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login");
    }
    return (
            <nav className={cn("max-lg:absolute transition transform translate-x-0 ease-out duration-500 bg-[#003449] flex flex-col justify-between gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 lg:relative inset-y-0 left-0 z-20")}>
                <div className="grid gap-6">
                    <img src={logoGreenWhite} className="w-full" alt="eGO_green_logo" />
                    <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                        {
                            appRoutes.map((route) => 
                                <NavItem key={route.name} {...route} />
                            )
                        }
                    </div>
                </div>
                <div className="grid gap-8">
                    <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                        {
                            otherRoutes.map((route) => 
                                <NavItem key={route.name} {...route} />
                            )
                        }
                        <button type="button" className="flex items-center p-3 gap-4 text-warning-400" onClick={() => logOut()}>
                            <Icon icon="uil:sign-out-alt" className="size-5" />
                            <span className="font-medium text-base">Logout</span>
                        </button>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 p-3">
                        <img src={blankImg} className="size-10 rounded-full object-cover" alt="user" />
                        <div className="flex-1 grid gap-1">
                            <h3 className="font-medium text-sm/4 text-white line-clamp-1 capitalize">First Medicals</h3>
                            <span className="font-medium text-xs text-gray-300 line-clamp-1 capitalize">Company</span>
                        </div>
                    </Link>
                </div>
            </nav>
    );
};