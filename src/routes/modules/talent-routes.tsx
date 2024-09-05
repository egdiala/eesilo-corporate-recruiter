import { Routes, Route } from "react-router-dom";
import { TalentSearchPage, ViewTalentPage } from "@/pages/talent-search";

const TalentRoutes = () => {
    return (
        <Routes>
            <Route index element={<TalentSearchPage />} />
            <Route path=":id/view" element={<ViewTalentPage />} />
        </Routes>
    );
};

export default TalentRoutes;