import { getAdminData } from "@/utils/authUtil";
import { useLocation } from "react-router-dom";

export const useRouteTitle = () => {
    const location = useLocation();
    const admin = getAdminData()
    const pathname = location.pathname;
  
    const routeTitles = {
        "/": `Welcome back, ${admin?.contact_person?.name as string ?? "User"}`,
        "/jobs": "Jobs",
        "/talent": "Talent Search",
        "/employees": "Employees",
        "/calendar": "Calendar",
        "/billings": "Billing & Subscription",
        "/report": "Reports",
        "/notifications": "Notifications",
        "/settings": "Settings",
        "/profile": "Profile"
    };

    // Find the most specific route title that matches
    const title = Object.keys(routeTitles)
        .reverse()
        .find(route => pathname.startsWith(route));

    return routeTitles[title as keyof typeof routeTitles] || "Default Title";
};