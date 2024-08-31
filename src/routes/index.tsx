import { ReactNode } from "react"
import { AuthRoutes, DashboardRoutes, JobRoutes } from "./modules"
import AuthLayout from "@/layouts/auth-layout"
import BlankLayout from "@/layouts/blank-layout"
import DashboardLayout from "@/layouts/dashboard-layout"
import { AnimatePresence } from "framer-motion"
import { OnboardingPage } from "@/pages/onboarding"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { TalentSearchPage } from "@/pages/talent-search"


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route path="onboarding" element={<BlankLayout><LocationProvider><OnboardingPage /></LocationProvider></BlankLayout>} />
                <Route path="/*" element={<DashboardLayout><LocationProvider><DashboardRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="jobs/*" element={<DashboardLayout><LocationProvider><JobRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="talent/*" element={<DashboardLayout><LocationProvider><TalentSearchPage /></LocationProvider></DashboardLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;