import { Fragment, useEffect, useState, type PropsWithChildren } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { setItem } from "@/utils/localStorage"
import { isAuthenticated } from "@/utils/authUtil"
import { Header, Sidebar } from "@/components/shared"
import { pageVariants } from "@/constants/animateVariants"
import type { NotificationCount } from "@/types/notification"
import { APP_USERDATA_STORAGE_KEY } from "@/constants/utils"
import { useMetadataConfig } from "@/hooks/useMetadataConfig"
import { useGetAccount, useGetNotifications } from "@/services/hooks/queries"
import { useAxiosInterceptor } from "@/services/axiosInstance"

const DashboardLayout = ({ children }: PropsWithChildren) => {
    useAxiosInterceptor();
    const metadata = useMetadataConfig()
    const isLoggedIn = isAuthenticated();
    const [showSidebar, setShowSidebar] = useState(false)
    
    const { data: account, isSuccess } = useGetAccount()
    const { data: notificationCount } = useGetNotifications<NotificationCount>({ component: "count-unread" })

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
        <Fragment>
            <Helmet>
                <title>Neesilo Corporate Recruiter | {metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
                <meta property="og:type" content={metadata.openGraph.type} />
                <meta property="og:url" content={metadata.openGraph.url} />
            </Helmet>

            <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="relative bg-gray-50 isolate flex min-h-dvh w-full overflow-hidden">
                <Sidebar admin={account!} notificationCount={notificationCount?.total!} showSidebar={showSidebar} close={() => setShowSidebar(false)} />
                <div className="relative h-full flex-1 xl:pl-60">
                    <Header notificationCount={notificationCount?.total!} setShowSidebar={() => setShowSidebar(true)} />
                    <main className="flex-1 overflow-hidden">
                        {children}
                        <AnimatePresence mode="wait">
                            {
                                showSidebar && (
                                    <motion.div initial={{ display: "none", opacity: 0 }} animate={{ display: "grid", position: "fixed", opacity: 1 }} exit={{ display: "none", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5 }} className="overflow-hidden bg-gray-100/25 top-0 left-0 right-0 bottom-0 inset-0 z-10" onClick={() => setShowSidebar(false)} />
                                )
                            }
                        </AnimatePresence>
                    </main>
                </div>
            </motion.div>
        </Fragment>
    );
};

export default DashboardLayout;