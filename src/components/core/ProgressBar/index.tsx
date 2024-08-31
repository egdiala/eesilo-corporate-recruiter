import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { RenderIf } from "../RenderIf";
import { cn } from "@/libs/cn";

interface ProgressBarProps {
    title?: string;
    value: number;
    help?: string | ReactNode;
    [x: string]: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ className, help, title, value }) => {
    return (
        <div className={cn("grid gap-2", className)}>
            <RenderIf condition={!!title}>
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm text-gray-900">{title}</h5>
                    <span className="text-xs text-gray-500">{value}%</span>
                </div>
            </RenderIf>
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-gray-200">
                    <motion.div className="h-1.5 rounded-full bg-primary-500" initial={{ width: "0%" }} whileInView={{ width: `${value}%` }} transition={{ ease: "linear", duration: 1 }}  />
                </div>
                <RenderIf condition={!title}><span className="text-xs text-gray-500">{value}%</span></RenderIf>
            </div>
            <RenderIf condition={!!help}><div className="text-xs text-gray-500">{help}</div></RenderIf>
        </div>

    )
}