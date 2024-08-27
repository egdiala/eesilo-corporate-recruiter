import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "@/pages/profile";
import { DashboardPage } from "@/pages";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
        </Routes>
    );
};

export default DashboardRoutes;