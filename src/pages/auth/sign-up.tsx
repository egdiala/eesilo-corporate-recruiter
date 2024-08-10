import React, { Fragment, useEffect, useState } from "react"
import logo from "@/assets/logo.svg"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { setItem } from "@/utils/localStorage"
import { PasswordStrength } from "@/components/shared"
import { AnimatePresence, motion } from "framer-motion"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Button, CheckBox, InputField } from "@/components/core"

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState("create-account")

    useEffect(() => {
        if (step === "confirm-email") {
            setTimeout(() => {
                setStep("create-password")
            }, 3000);
        }
    }, [step])
    
    const { register, values } = useFormikWrapper({
        initialValues: {
            password: ""
        },
        onSubmit: () => {

        }
    })

    const backToLogin = () => {
        setItem("newPass", "newPass")
        navigate("/auth/login")
    }
    return (
        <Fragment>
        <AnimatePresence mode="popLayout">
            {
                step === "create-account" && (
                    <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <div className="grid p-6 place-content-center mx-auto">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Create a new account</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Please provide a valid email address to get started with Neesilo</p>
                        </div>
                        <div className="grid gap-4">
                            <InputField label="Email Address" type="text" size="40" placeholder="Enter your email address" />
                        </div>
                        <CheckBox
                            label={<div className="text-sm text-gray-900">I agree to Neesilo Terms & Conditions</div>}
                        />
                        <div className="grid gap-4">
                            <Button type="button" theme="primary" variant="filled" size="40" block onClick={() => setStep("confirm-email")}>Create Account</Button>
                            <Button type="button" theme="primary" variant="ghost" size="40" onClick={() => navigate("/auth/login")} block>Login</Button>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
            {
                step === "confirm-email" && (
                    <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid w-full max-w-md">
                        <div className="grid p-6 place-content-center mx-auto">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="grid gap-4 justify-items-center p-5 rounded-2xl border border-gray-200">
                            <div className="size-10 grid place-content-center rounded-[0.625rem] bg-success-50">
                                <Icon icon="ri:checkbox-circle-fill" className="text-success-500 size-6" />
                            </div>
                            <div className="grid gap-1">
                                <h1 className="font-medium text-base text-gray-900 text-center">Confirmation email sent</h1>
                                <p className="text-sm text-gray-500 text-center">A confirmation link has been sen to your email address. Click on the link to proceed.</p>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
            {
                step === "create-password" && (
                    <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <div className="grid p-6 place-content-center mx-auto">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Create password</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Secure your account by creating a strong password</p>
                        </div>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <InputField label="Password" type="password" size="40" placeholder="Enter your password" iconRight="ri:key-line" {...register("password")} />
                                <PasswordStrength value={values.password} />
                            </div>
                            <InputField label="Confirm Password" type="password" size="40" placeholder="Enter your password" iconRight="ri:key-line" />
                        </div>
                        <Button type="button" theme="primary" variant="filled" size="40" block onClick={() => backToLogin()}>Create Password</Button>
                    </motion.div>
                )
            }
        </AnimatePresence>
        </Fragment>
    )
}