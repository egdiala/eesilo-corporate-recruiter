import type { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "@/utils/authUtil"

const AuthLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();

    if (isLoggedIn) {
        return <Navigate to='/' replace />;
    }
    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="flex justify-center items-start md:items-center pt-12 md:pt-0 lg:-mt-24 w-full h-full bg-portal-bg px-[1.125rem] lg:px-0 overflow-y-scroll">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;