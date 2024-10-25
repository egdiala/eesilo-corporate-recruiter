import { Fragment, type PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { isAuthenticated } from "@/utils/authUtil"
import { useMetadataConfig } from "@/hooks/useMetadataConfig"

const AuthLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated()
    const metadata = useMetadataConfig()

    if (isLoggedIn) {
        return <Navigate to='/' replace />;
    }
    return (
        <Fragment>
            <Helmet>
                <title>Neesilo Corporate Recruiter | {metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
                <meta property="og:type" content={metadata.openGraph.type} />
                <meta property="og:url" content={metadata.openGraph.url} />
            </Helmet>

            <div className='w-full h-screen overflow-hidden'>
                <div className="flex justify-center items-start md:items-center pt-12 md:pt-0 lg:-mt-24 w-full h-full bg-portal-bg px-[1.125rem] lg:px-0 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </Fragment>
    );
};

export default AuthLayout;