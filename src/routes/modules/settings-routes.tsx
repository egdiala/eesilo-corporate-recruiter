import { Routes, Route } from "react-router-dom";
import { ChangeEmailPage, ChangePasswordPage, SettingsPage, SettingsSecurityPage, SettingsStaffAccessControlPage } from "@/pages/settings";

const SettingsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<SettingsPage />}>
                <Route path="security" element={<SettingsSecurityPage />} />
                <Route path="staff-access" element={<SettingsStaffAccessControlPage />} />
            </Route>
            <Route path="change-email" element={<ChangeEmailPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
        </Routes>
    );
};

export default SettingsRoutes;