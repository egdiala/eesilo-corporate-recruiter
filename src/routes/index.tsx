import { ReactNode } from "react";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./modules";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;