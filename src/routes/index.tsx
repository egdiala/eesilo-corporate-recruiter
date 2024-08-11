import { ReactNode } from "react"
import { AuthRoutes } from "./modules"
import AuthLayout from "@/layouts/auth-layout"
import { AnimatePresence } from "framer-motion"
import BlankLayout from "@/layouts/blank-layout"
import { OnboardingPage } from "@/pages/onboarding"
import { Routes, Route, BrowserRouter } from "react-router-dom"


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
                <Route path="onboarding" element={<BlankLayout><LocationProvider><OnboardingPage /></LocationProvider></BlankLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;