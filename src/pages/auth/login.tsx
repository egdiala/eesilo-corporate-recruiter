import React from "react"
import { motion } from "framer-motion"
import { routeVariants } from "@/constants/animateVariants"
import { Button, InputField } from "@/components/core"
import logo from "@/assets/logo.svg"

export const LoginPage: React.FC = () => {
    return (
        <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 max-w-96">
            <img src={logo} alt="neesilo_logo" className="mx-auto" />
            <div className="grid gap-2">
                <h1 className="font-semibold text-xl text-gray-900 text-center">Log into your account</h1>
                <p className="font-medium text-base text-gray-500 text-center">Welcome back! Please enter your details to login</p>
            </div>
            <div className="grid gap-4">
                <InputField label="Email Address" type="text" size="40" placeholder="Enter your email address" />
                <div className="grid gap-1">
                    <InputField label="Password" type="password" size="40" placeholder="Enter your password" iconRight="ri:key-line" />
                    <div className="flex items-center justify-end py-0.5">
                        <span className="font-medium text-xs text-primary-500">Forgot Password</span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                <Button theme="primary" variant="filled" size="40">Login</Button>
                <Button theme="primary" variant="ghost" size="40">Sign up</Button>
            </div>
        </motion.div>
    )
}