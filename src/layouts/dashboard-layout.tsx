import { useEffect, type PropsWithChildren } from "react"
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom"
import { setItem } from "@/utils/localStorage";
import { isAuthenticated } from "@/utils/authUtil"
import { Header, Sidebar } from "@/components/shared"
import { useGetAccount } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { APP_USERDATA_STORAGE_KEY } from "@/constants/utils";

const DashboardLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();

    const { data: account, isSuccess } = useGetAccount()

    useEffect(() => {
        if (isSuccess) {
            setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(account));
        }
    },[account, isSuccess])

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="relative bg-gray-50 isolate flex min-h-dvh w-full overflow-hidden">
            <Sidebar />
            <div className="relative h-full flex-1">
                <Header />
                <main className="flex-1 overflow-hidden">
                    {children}
                </main>
            </div>
        </motion.div>
    );
};

export default DashboardLayout;