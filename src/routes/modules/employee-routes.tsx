import { Routes, Route } from "react-router-dom";
import { EmployeeActiveRolesPage, EmployeeDocumentsPage, EmployeeInformationPage, EmployeesPage, ViewEmployeePage } from "@/pages/employees";

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route index element={<EmployeesPage />} />
            <Route path="view/:id" element={<ViewEmployeePage />}>
                <Route path="active-roles" element={<EmployeeActiveRolesPage />} />
                <Route path="documents" element={<EmployeeDocumentsPage />} />
                <Route path="information" element={<EmployeeInformationPage />} />
            </Route>
        </Routes>
    );
};

export default EmployeeRoutes;