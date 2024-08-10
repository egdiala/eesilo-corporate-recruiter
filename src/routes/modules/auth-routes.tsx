import { Routes, Route } from "react-router-dom";
import { AuthWelcomePage, LoginPage, SignUpPage } from "@/pages/auth"

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="welcome" element={<AuthWelcomePage />} />
        </Routes>
    );
};

export default AuthRoutes;