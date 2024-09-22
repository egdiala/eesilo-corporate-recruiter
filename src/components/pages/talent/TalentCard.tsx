import React, { useMemo, type ElementType } from "react";
import { Avatar, ContentDivider, ProgressBar } from "@/components/core";
import type { FetchedTalent } from "@/types/applicants";
import { cn } from "@/libs/cn";

interface TalentCardProps {
    as?: ElementType | "div"
    talent: FetchedTalent
    [x: string]: any;
}

export const TalentCard: React.FC<TalentCardProps> = ({ as, className, talent, ...props }) => {
    const Component = as === undefined ? "div" : as;

    const infos = useMemo(() => {
        return [
            { label: "Specialty", value: talent?.specialty_data?.specialty_main },
            { label: "Sub-specialty", value: talent?.specialty_data?.specialty_sub },
            { label: "Years of Experience", value: talent?.specialty_data?.year_exp }
        ]
    },[talent?.specialty_data?.specialty_main, talent?.specialty_data?.specialty_sub, talent?.specialty_data?.year_exp])

    return (
        <Component className={cn("border border-gray-200 bg-gray-25 rounded-xl overflow-hidden", className)} {...props}>
            <div className="grid gap-3.5">
                <div className="flex items-center gap-3 bg-gray-800 py-2.5 px-4">
                    <Avatar size="40" alt={`${talent?.first_name}_${talent?.last_name}`} image={talent?.avatar} />
                    <h1 className="font-medium text-sm text-white capitalize">{talent?.first_name} {talent?.last_name}</h1>
                </div>
                <div className="grid gap-2.5 px-4 pb-4">
                    {
                        infos.map((info) =>
                            <div key={info.label}>
                                <span className="text-xs text-gray-400">{info.label}</span>
                                <h4 className="text-xs text-black">{info.value}</h4>
                            </div>
                        )
                    }
                    <ContentDivider />
                    <div className="grid">
                        <ProgressBar value={69} className="w-1/2" />
                        <span className="font-normal text-[0.625rem] leading-[1.125rem] text-gray-500">Select a job role to compare</span>
                    </div>
                </div>
            </div>
        </Component>
    )
}