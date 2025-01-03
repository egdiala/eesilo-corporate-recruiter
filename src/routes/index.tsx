import { lazy, ReactNode } from "react"
import AuthLayout from "@/layouts/auth-layout"
import { CalendarPage } from "@/pages/calendar"
import { AnimatePresence } from "framer-motion"
import BlankLayout from "@/layouts/blank-layout"
import { OnboardingPage } from "@/pages/onboarding"
import DashboardLayout from "@/layouts/dashboard-layout"
import { NotificationsPage } from "@/pages/notifications"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { AuthRoutes, BillingRoutes, DashboardRoutes, EmployeeRoutes, JobRoutes, SettingsRoutes, TalentRoutes } from "./modules"
import { ReportsPage } from "@/pages/reports"

const CheckoutFormPage = lazy(() => import("@/pages/billing/checkout"))

function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route path="billings/*" element={<DashboardLayout><LocationProvider><BillingRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="calendar/*" element={<DashboardLayout><LocationProvider><CalendarPage /></LocationProvider></DashboardLayout>} />
                <Route path="employees/*" element={<DashboardLayout><LocationProvider><EmployeeRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="onboarding" element={<BlankLayout><LocationProvider><OnboardingPage /></LocationProvider></BlankLayout>} />
                <Route path="/*" element={<DashboardLayout><LocationProvider><DashboardRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="jobs/*" element={<DashboardLayout><LocationProvider><JobRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="/billings/checkout" element={<DashboardLayout><LocationProvider><CheckoutFormPage /></LocationProvider></DashboardLayout>} />
                <Route path="notifications/*" element={<DashboardLayout><LocationProvider><NotificationsPage /></LocationProvider></DashboardLayout>} />
                <Route path="report" element={<DashboardLayout><LocationProvider><ReportsPage /></LocationProvider></DashboardLayout>} />
                <Route path="settings/*" element={<DashboardLayout><LocationProvider><SettingsRoutes /></LocationProvider></DashboardLayout>} />
                <Route path="talent/*" element={<DashboardLayout><LocationProvider><TalentRoutes /></LocationProvider></DashboardLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;