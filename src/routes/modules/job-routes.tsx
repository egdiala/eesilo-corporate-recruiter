import { Routes, Route } from "react-router-dom";
import { CreateJobPage, JobsPage } from "@/pages/jobs";

const JobRoutes = () => {
    return (
        <Routes>
            <Route index element={<JobsPage />} />
            <Route path="create" element={<CreateJobPage />} />
        </Routes>
    );
};

export default JobRoutes;