import { Routes, Route } from "react-router-dom";
import { CreateJobPage, EditJobPage, JobsPage, ViewJobCandidatePage, ViewJobPage } from "@/pages/jobs";

const JobRoutes = () => {
    return (
        <Routes>
            <Route index element={<JobsPage />} />
            <Route path="create" element={<CreateJobPage />} />
            <Route path=":id/view" element={<ViewJobPage />} />
            <Route path=":id/edit" element={<EditJobPage />} />
            <Route path=":id/shortlists/:talentId" element={<ViewJobCandidatePage />} />
        </Routes>
    );
};

export default JobRoutes;