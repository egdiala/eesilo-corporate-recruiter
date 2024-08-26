import React, { ReactNode } from "react";
import { cn } from "@/libs/cn";
import "./tag.css";

interface TagProps {
    /**
     * Renders child nodes passed into Button component
     */
    children?: string | ReactNode;
    /**
     * Wether or not to disable the tag
     */
    disabled?: boolean;
    /**
     * Renders variant for Tag component
     */
    theme: "stroke" | "gray";
    /**
     * Arbitrary props
     */
    [x: string]: any;
}

export const Tag: React.FC<TagProps> = ({ children, disabled, theme, className }) => {
    return (
        <button type="button" className={cn("neesilo-tag", `neesilo-tag--${theme}`, className)} disabled={disabled}>{children}</button>
    )
}