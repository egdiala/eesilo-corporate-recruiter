import { Routes, Route } from "react-router-dom";
import { SettingsPage } from "@/pages/settings";

const SettingsRoutes = () => {
    return (
        <Routes>
            <Route index element={<SettingsPage />} />
            {/* <Route path="create" element={<CreateJobPage />} />
            <Route path=":id/view" element={<ViewJobPage />} />
            <Route path=":id/edit" element={<EditJobPage />} /> */}
        </Routes>
    );
};

export default SettingsRoutes;