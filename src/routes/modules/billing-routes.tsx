import { Routes, Route } from "react-router-dom";
import { BillingPage, BillingPlansPage, BillingsHistoryPage, BillingsMethodPage } from "@/pages/billing";

const BillingRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<BillingPage />}>
                <Route path="plans" element={<BillingPlansPage />} />
                <Route path="payment-methods" element={<BillingsMethodPage />} />
                <Route path="history" element={<BillingsHistoryPage />} />
            </Route>
        </Routes>
    );
};

export default BillingRoutes;