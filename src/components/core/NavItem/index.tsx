import React from "react";
import { cn } from "@/libs/cn";
import { RenderIf } from "../RenderIf";
import { Icon, type IconifyIcon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import "./navItem.css"

interface NavItemProps {
  /**
   * URL to route to
   */
  to: string;
  /**
   * Name of the page to route to
   */
  name: string;
  /**
   * Icon for route
   */
  icon: string | IconifyIcon;
  /**
   * Number count
   */
  count?: string | number;
  /**
   * Number count
   */
  close?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ close, count, icon, name, to }) => {
    return (
        <NavLink to={to} onClick={() => close?.()}>
            {({ isActive }) => (
                <div className={cn("neesilo-module-list-item group", isActive && "neesilo-module-list-item--active")}>
                    <Icon icon={icon} className={cn("size-5 transition-all duration-500 ease-out", !isActive && "group-hover:text-[#71839B]")} />
                    <span className={cn("flex-1 line-clamp-1", !isActive && "group-hover:text-[#324054]")}>{name}</span>
                    <RenderIf condition={!!count}>
                        <div className='bg-warning-600 py-0.5 px-1.5 rounded-3xl text-white text-xs'>{count}</div>
                    </RenderIf>
                </div>
            )}
        </NavLink>
    )
}