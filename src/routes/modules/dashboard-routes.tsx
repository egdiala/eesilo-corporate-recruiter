import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "@/pages/profile";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="profile" element={<ProfilePage />} />
        </Routes>
    );
};

export default DashboardRoutes;