import React, { useMemo, type ElementType } from "react";
import { Avatar, ContentDivider, ProgressBar, RenderIf } from "@/components/core";
import type { FetchedTalent } from "@/types/applicants";
import { cn } from "@/libs/cn";
import { FetchedEmployee } from "@/types/employee";

interface TalentCardProps {
    as?: ElementType | "div"
    talent: FetchedTalent | FetchedEmployee["user_data"]
    activeRoles?: number;
    [x: string]: any;
}

export const TalentCard: React.FC<TalentCardProps> = ({ as, className, activeRoles, talent, ...props }) => {
    const Component = as === undefined ? "div" : as;

    const infos = useMemo(() => {
        return [
            { label: "Specialty", value: talent?.specialty_data?.specialty_main },
            { label: "Sub-specialty", value: talent?.specialty_data?.specialty_sub },
            (!activeRoles && { label: "Years of Experience", value: talent?.specialty_data?.year_exp }),
            (activeRoles && { label: "Active Job Roles", value: activeRoles })
        ].filter((item) => (item !== false) && (item !== 0))
    },[activeRoles, talent?.specialty_data?.specialty_main, talent?.specialty_data?.specialty_sub, talent?.specialty_data?.year_exp])

    const imageUrl = `${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/business/fnviewers/${talent?.avatar}`
    return (
        <Component className={cn("border border-gray-200 bg-gray-25 rounded-xl overflow-hidden", className)} {...props}>
            <div className="grid gap-3.5">
                <div className="flex items-center gap-3 bg-gray-800 py-2.5 px-4">
                    <Avatar size="40" alt={`${talent?.first_name}`} image={talent?.avatar ? imageUrl : talent?.avatar} />
                    <h1 className="font-medium text-sm text-white capitalize">{talent?.first_name}</h1>
                </div>
                <div className="grid gap-2.5 px-4 pb-4">
                    {
                        infos.map((info) =>
                            <div key={info?.label}>
                                <span className="text-xs text-gray-400">{info?.label}</span>
                                <h4 className="text-xs text-black">{info?.value}</h4>
                            </div>
                        )
                    }
                    <RenderIf condition={!!(talent as FetchedTalent)?.match_count}>
                        <ContentDivider />
                        <div className="grid">
                            <ProgressBar value={(talent as FetchedTalent)?.match_count * 10} className="w-1/2" />
                            <span className="font-normal text-[0.625rem] leading-[1.125rem] text-gray-500">Select a job role to compare</span>
                        </div>
                    </RenderIf>
                </div>
            </div>
        </Component>
    )
}