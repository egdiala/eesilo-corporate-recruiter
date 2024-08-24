import { Routes, Route } from "react-router-dom";
import { JobsPage } from "@/pages/jobs";

const JobRoutes = () => {
    return (
        <Routes>
            <Route index element={<JobsPage />} />
        </Routes>
    );
};

export default JobRoutes;