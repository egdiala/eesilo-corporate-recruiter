import type { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='w-full h-screen overflow-hidden'>
            <div className="flex justify-center items-center lg:-mt-24 w-full h-full bg-portal-bg px-[1.125rem] lg:px-0">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;