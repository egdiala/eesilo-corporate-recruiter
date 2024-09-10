import { Routes, Route } from "react-router-dom";
import { BillingPage, MakePaymentPage } from "@/pages/billing";

const BillingRoutes = () => {
    return (
        <Routes>
            <Route index element={<BillingPage />} />
            <Route path="payment" element={<MakePaymentPage />} />
        </Routes>
    );
};

export default BillingRoutes;