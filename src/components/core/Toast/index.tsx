import React, { useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import "./toast.css";
import { RenderIf } from "../RenderIf";

export type Keys = "success" | "warning" | "error" | "information" | "feature";
export type Variants = "filled" | "stroke" | "lighter" | "light";
export type Sizes = "32" | "36" | "large"

export interface ToastProps {
    /**
     * Renders the variant of toast which can either be success, warning or error
     */
    type: Keys;
    /**
     * Renders the title of the message shown in the toast
     */
    title: string;
    /**
    * What variant to render
    */
    variant: Variants;
    /**
     * Renders the message which is a detailed description of the title
     */
    message: string;
    /**
    * What size to render
    */
    size: Sizes
    /**
     * Other unknown attributes
     */
    [x: string]: unknown;
}

const toastIcons = {
    error: "ri:error-warning-fill",
    warning: "ri:alert-fill",
    success: "ri:checkbox-circle-fill",
    information: "ri:information-fill",
    feature: "ri:magic-fill",
} as const satisfies Partial<Record<Keys, string>>;

const toastIconClass = {
    error: {
        filled: "text-white",
        light: "text-error-700",
        lighter: "text-error-500",
        stroke: "text-error-500"
    },
    warning: {
        filled: "text-white",
        light: "text-warning-700",
        lighter: "text-warning-500",
        stroke: "text-warning-500"
    },
    success: {
        filled: "text-white",
        light: "text-success-700",
        lighter: "text-success-500",
        stroke: "text-success-500"
    },
    information: {
        filled: "text-white",
        light: "text-primary-700",
        lighter: "text-primary-500",
        stroke: "text-primary-500"
    },
    feature: {
        filled: "text-white",
        light: "text-gray-900",
        lighter: "text-gray-500",
        stroke: "text-gray-500"
    },
} as const satisfies Partial<Record<Keys, Record<Variants, string>>>;

const toastIconCloseClass = {
    error: {
        filled: "text-white",
        light: "text-error-700",
        lighter: "text-gray-400",
        stroke: "text-gray-400"
    },
    warning: {
        filled: "text-white",
        light: "text-warning-700",
        lighter: "text-gray-400",
        stroke: "text-gray-400"
    },
    success: {
        filled: "text-white",
        light: "text-success-700",
        lighter: "text-gray-400",
        stroke: "text-gray-400"
    },
    information: {
        filled: "text-white",
        light: "text-primary-700",
        lighter: "text-gray-400",
        stroke: "text-gray-400"
    },
    feature: {
        filled: "text-white",
        light: "text-gray-900",
        lighter: "text-gray-400",
        stroke: "text-gray-400"
    },
} as const satisfies Partial<Record<Keys, Record<Variants, string>>>;

export const Toast: React.FC<ToastProps> = ({ type, title, variant, message, size, id }) => {
    const toastStyle = useMemo(() => {
        return `neesilo-toast--${type}-${variant}`
    }, [type, variant])
    
    const toastSize = useMemo(() => {
        return `neesilo-toast--${size}`
    }, [size])
    
    return (
        <div className={cn("group toast-container", toastStyle, toastSize, size === "large" ? "rounded-xl px-3.5 pt-3.5 pb-4 gap-3" : "rounded-lg gap-2", size === "32" && "p-2", size === "36" && "py-2 px-2.5")}>
            <Icon icon={toastIcons[type]} className={cn(toastIconClass[type][variant], size === "32" && "size-4", size === "36" && "size-5", size === "large" && "size-5")} />
            <div className="grid gap-2.5 flex-1">
                <div className="grid gap-1">
                    <RenderIf condition={(size === "large") && !!title}>
                        <h2 className="font-medium text-sm">{title}</h2>
                    </RenderIf>
                    <p className={cn(size === "32" ? "text-xs" : "text-sm")}>{message}</p>
                </div>
            </div>
            <button type="button" onClick={() => toast.dismiss(id as string | number | undefined)}>
                <Icon icon='lucide:x' className={cn(toastIconCloseClass[type][variant])} />
            </button>
        </div>
    )
}