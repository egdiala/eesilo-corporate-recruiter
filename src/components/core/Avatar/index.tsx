import React from "react"

interface AvatarProps {
    size: "80" | "72" | "64" | "56" | "48" | "40" | "32" | "24" | "20"
    image: string
    [x: string]: unknown
}

export const Avatar: React.FC<AvatarProps> = ({ image, size, ...props }) => {
    return (
        <div style={{ width: `${size}px`, height: `${size}px` }} className="rounded-full overflow-hidden">
            <img src={image} className="object-cover object-center" style={{ width: `${size}px`, height: `${size}px` }} {...props} />
        </div>
    )
}