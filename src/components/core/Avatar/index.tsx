import React from "react"
import { cn } from "@/libs/cn"
import blankImage from "@/assets/blank.svg"

interface AvatarProps {
    size: "80" | "72" | "64" | "56" | "48" | "40" | "32" | "24" | "20"
    image: string
    [x: string]: unknown
}

export const Avatar: React.FC<AvatarProps> = ({ image, size, ...props }) => {
    return (
        <div style={{ width: `${size}px`, height: `${size}px` }} className={cn("rounded-full overflow-hidden")}>
            <img src={image || blankImage} className="object-cover object-center" style={{ width: `${size}px`, height: `${size}px` }} {...props} />
        </div>
    )
}
