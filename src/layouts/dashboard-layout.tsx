import { useEffect, useState, type PropsWithChildren } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { Navigate } from "react-router-dom"
import { setItem } from "@/utils/localStorage";
import { isAuthenticated } from "@/utils/authUtil"
import { Header, Sidebar } from "@/components/shared"
import { useGetAccount } from "@/services/hooks/queries";
import { pageVariants } from "@/constants/animateVariants";
import { APP_USERDATA_STORAGE_KEY } from "@/constants/utils";

const DashboardLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();
    const [showSidebar, setShowSidebar] = useState(false)
    
    const { data: account, isSuccess } = useGetAccount()

    useEffect(() => {
        if (isSuccess) {
            setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(account));
        }
    }, [account, isSuccess])
    
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    },[showSidebar])

    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="relative bg-gray-50 isolate flex min-h-dvh w-full overflow-hidden">
            <Sidebar admin={account!} showSidebar={showSidebar} />
            <div className="relative h-full flex-1 lg:pl-60">
                <Header setShowSidebar={() => setShowSidebar(!showSidebar)} />
                <main className="flex-1 overflow-hidden">
                    {children}
                    <AnimatePresence mode="wait">
                        {
                            showSidebar && (
                                <motion.div initial={{ display: "none", opacity: 0 }} animate={{ display: "grid", position: "fixed", opacity: 1 }} exit={{ display: "none", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5 }} className="overflow-hidden bg-gray-100/25 top-0 left-0 right-0 bottom-0 inset-0 z-10" onClick={() => setShowSidebar(!showSidebar)} />
                            )
                        }
                    </AnimatePresence>
                </main>
            </div>
        </motion.div>
    );
};

export default DashboardLayout;