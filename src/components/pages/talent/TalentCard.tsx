import React, { useMemo, type ElementType } from "react";
import { Avatar, ProgressBar } from "@/components/core";
import type { FetchedTalent } from "@/types/applicants";

interface TalentCardProps {
    as?: ElementType | "div"
    talent: FetchedTalent
    [x: string]: unknown
}

export const TalentCard: React.FC<TalentCardProps> = ({ as, talent, ...props }) => {
    const Component = as === undefined ? "div" : as;

    const infos = useMemo(() => {
        return [
            { label: "Specialty", value: talent?.specialty_data?.specialty_main },
            { label: "Sub-specialty", value: talent?.specialty_data?.specialty_sub },
            { label: "Years of Experience", value: talent?.specialty_data?.year_exp }
        ]
    },[talent?.specialty_data?.specialty_main, talent?.specialty_data?.specialty_sub, talent?.specialty_data?.year_exp])

    return (
        <Component className="border border-gray-200 bg-gray-25 p-4 rounded-xl" {...props}>
            <div className="grid gap-2.5">
                <div className="flex items-center gap-3">
                    <Avatar size="40" alt={`${talent?.first_name}_${talent?.last_name}`} image="" />
                    <h1 className="font-medium text-sm text-gray-900">{talent?.first_name} {talent?.last_name}</h1>
                </div>
                <hr className="border-gray-200" />
                {
                    infos.map((info) =>
                        <div key={info.label}>
                            <span className="text-xs text-gray-400">{info.label}</span>
                            <h4 className="text-xs text-black">{info.value}</h4>
                        </div>
                    )
                }
                <hr className="border-gray-200" />
                <div className="grid">
                    <ProgressBar value={69} className="w-1/2" />
                    <span className="font-normal text-[0.625rem] leading-[1.125rem] text-gray-500">Select a job role to compare</span>
                </div>
            </div>
        </Component>
    )
}