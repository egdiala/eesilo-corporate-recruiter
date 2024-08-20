import type { ReactNode } from "react"

const BlankLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full h-screen">{children}</main>
    )
};

export default BlankLayout;