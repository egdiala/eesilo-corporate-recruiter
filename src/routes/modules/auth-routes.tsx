import { Routes, Route } from "react-router-dom";
import { ForgotPasswordPage, LoginPage, SignUpPage } from "@/pages/auth"

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
    );
};

export default AuthRoutes;