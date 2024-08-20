import { type PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "@/utils/authUtil"
import { Header, Sidebar } from "@/components/shared"

const DashboardLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="relative bg-gray-50 isolate flex min-h-dvh w-full overflow-hidden">
            <Sidebar />
            <div className="relative h-full flex-1">
                <Header />
                <main className="px-8 pt-5 pb-10 flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;