import React from "react"
import { cn } from "@/libs/cn"
import logo from "@/assets/logo.svg"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Button } from "@/components/core"
import { useNavigate } from "react-router-dom"
import healthWorker from "@/assets/health_worker.png"
import { routeVariants } from "@/constants/animateVariants"
import companyRecruiter from "@/assets/company_recruiter.png"

export const AuthWelcomePage: React.FC = () => {
    const navigate = useNavigate()
    const options = [
        {
            label: "Health Worker",
            image: healthWorker,
            imageClass: "bg-success-50",
            description: "As a Worker, you can:",
            features: [
                "Create and manage your professional profile",
                "Search for and apply to job listings",
                "Connect with recruiters"
            ],
            buttonText: "Continue as Health Worker",
            buttonAction: () => {}
        },
        {
            label: "Company/Recruiter",
            image: companyRecruiter,
            imageClass: "bg-primary-50",
            description: "As a Recruiter, you can:",
            features: [
                "Post job openings",
                "Search for and contact potential candidates",
                "Manage applications and hiring processes"
            ],
            buttonText: "Continue as Company/Recruiter",
            buttonAction: () => navigate("/auth/sign-up")
        }
    ]
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid justify-items-center gap-6 p-4 md:p-0 w-full max-w-[50.375rem]">
            <img src={logo} alt="neesilo_logo" className="mx-auto" />
            <div className="grid gap-2 w-full max-w-96">
                <h1 className="font-semibold text-xl text-gray-900 text-center">Select Account Type</h1>
                <p className="font-medium text-base text-gray-500 text-center">Please select the account type you would like to create</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                {
                    options.map((option) =>
                    <div key={option.label.toLowerCase()}>
                        <div className="flex flex-col gap-4 p-5 border-x border-t border-x-gray-200 border-t-gray-200 rounded-t-2xl">
                            <div className="flex items-center gap-4">
                                <div className={cn("rounded-full bg-success-50 grid place-content-center", option.imageClass)} style={{ width: "70px", height: "70px" }}>
                                    <img src={option.image} alt={option.label} className="size-9" />
                                </div>
                                <h2 className="font-medium text-base text-gray-900">{option.label}</h2>
                            </div>
                            <div className="flex flex-col gap-2.5">
                                <span className="text-sm text-black">{option.description}</span>
                                <ul className="list-inside">
                                    {
                                        option.features.map((feature) =>
                                        <li key={feature}>
                                            <div className="flex items-center gap-1">
                                                <Icon icon="ri:check-line" className="size-6 text-success-500" />
                                                <span className="text-xs text-gray-500">{feature}</span>
                                            </div>
                                        </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center py-4 px-5 border border-gray-200 rounded-b-2xl">
                            <Button theme="primary" variant="filled" size="36" onClick={option.buttonAction} block>{option.buttonText}</Button>
                        </div>
                    </div>
                    )
                }
            </div>
        </motion.div>
    )
}