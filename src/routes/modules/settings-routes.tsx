import { Routes, Route } from "react-router-dom";
import { ChangePasswordPage, SettingsPage } from "@/pages/settings";
import { ChangeEmailPage } from "@/pages/settings/change-email";

const SettingsRoutes = () => {
    return (
        <Routes>
            <Route index element={<SettingsPage />} />
            <Route path="change-email" element={<ChangeEmailPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
        </Routes>
    );
};

export default SettingsRoutes;