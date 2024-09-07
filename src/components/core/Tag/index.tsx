import React, { Fragment, ReactNode } from "react";
import { cn } from "@/libs/cn";
import "./tag.css";
import { RenderIf } from "../RenderIf";

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
     * Wether or not to close the tag
     */
    closeable?: boolean;
    /**
     * Renders variant for Tag component
     */
    theme: "stroke" | "gray";
    /**
     * Arbitrary props
     */
    [x: string]: any;
}

export const Tag: React.FC<TagProps> = ({ children, disabled, theme, closeable = false, className }) => {
    return (
        <Fragment>
            <RenderIf condition={!closeable}>
                <button type="button" className={cn("neesilo-tag", `neesilo-tag--${theme}`, className)} disabled={disabled}>{children}</button>                
            </RenderIf>
            <RenderIf condition={closeable}>
                <div className={cn("neesilo-tag", `neesilo-tag--${theme}`, className)}>{children}</div>                
            </RenderIf>
        </Fragment>
        
    )
}