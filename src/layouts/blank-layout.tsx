import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/authUtil";

const BlankLayout = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = isAuthenticated();

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }
    
    return (
        <main className="w-full h-screen">{children}</main>
    )
};

export default BlankLayout;