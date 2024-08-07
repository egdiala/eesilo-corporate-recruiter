import React, { useMemo, type ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Loader } from "./Loader";
import { RenderIf } from "../RenderIf";
import "./button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    /**
     * Shows a loading state on Button component
     */
    loading?: boolean;
    /**
     * Should the button fill it's parent container?
     */
    block?: boolean;
    /**
    * What theme to render
    */
    theme: "primary" | "neutral" | "error"
    /**
    * What variant to render
    */
    variant: "filled" | "stroke" | "lighter" | "ghost"
    /**
    * What size to render
    */
    size: "40" | "36" | "32"
    /**
     * Renders child nodes passed into Button component
     */
    children?: string | ReactNode;
    /**
     * Other unknown attributes
     */
    [x: string]: any;
}

export const Button: React.FC<ButtonProps> = ({ className, loading, block, theme, variant, size, children, ...props }) => {
    const btnStyle = useMemo(() => {
        return `neesilo-button--${theme}-${variant}`
    }, [theme, variant])
    
    const btnSize = useMemo(() => {
        return `neesilo-button--${size}`
    },[size])

    const width = block && "neesilo-button--block";

    return (
        <button className={cn("neesilo-button", btnStyle, width, btnSize, className)} {...props}>
            <RenderIf condition={!!loading}>
                <div className="flex items-center justify-center">
                    <Loader className="spinner" />
                </div>
            </RenderIf>
            <RenderIf condition={!loading}>
                {children}
            </RenderIf>
        </button>
    )
}