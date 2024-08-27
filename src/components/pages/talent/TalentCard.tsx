import { Avatar } from "@/components/core";
import React, { type ElementType } from "react";


interface TalentCardProps {
    as?: ElementType | "div"
    [x: string]: unknown
}

export const TalentCard: React.FC<TalentCardProps> = ({ as, ...props }) => {
    const Component = as === undefined ? "div" : as;

    const infos = [
        { label: "Specialty", value: "Nurse" },
        { label: "Sub-specialty", value: "Nurse Speciality" },
        { label: "Years of Experience", value: "5" }
    ]

    return (
        <Component className="border border-gray-200 bg-gray-25 p-4 rounded-xl" {...props}>
            <div className="grid gap-2.5">
                <div className="flex items-center gap-3">
                    <Avatar size="40" alt="user" image="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <h1 className="font-medium text-sm text-gray-900">Agnes James</h1>
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
            </div>
        </Component>
    )
}