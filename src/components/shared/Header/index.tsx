import React from "react";
import { Icon } from "@iconify/react";
import { useRouteTitle } from "@/hooks/useRouteTitle";

interface HeaderProps {
    setShowSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ setShowSidebar }) => {

    const routeTitle = useRouteTitle()
    return (
        <header className="flex items-center gap-3 sticky top-0 left-0 right-0 bg-white border-b border-b-gray-200 py-5 px-8">
            <button type="button" className="group lg:hidden grid place-content-center size-10 rounded-lg hover:bg-gray-100 transition ease-out duration-300" onClick={setShowSidebar}>
                <div className="relative">
                    <Icon icon="ri:menu-line" className="size-5 text-gray-500 group-focus:text-primary-500" />
                </div>
            </button>
            <div className="flex-1 font-semibold text-lg md:text-xl line-clamp-1 text-gray-900">{routeTitle}</div>
            <button type="button" className="group grid place-content-center size-10 rounded-lg hover:bg-gray-100 transition ease-out duration-300">
                <div className="relative">
                    <Icon icon="ri:search-2-line" className="size-5 text-gray-500 group-focus:text-primary-500" />
                </div>
            </button>
            <button type="button" className="group grid place-content-center size-10 rounded-lg hover:bg-gray-100 transition ease-out duration-300">
                <div className="relative">
                    <Icon icon="ri:notification-3-line" className="size-5 text-gray-500 group-focus:text-primary-500" />
                    <span className="absolute top-0 right-0 bg-error-500 p-0.5 rounded border-2 border-white" />
                </div>
            </button>
        </header>
    )
}