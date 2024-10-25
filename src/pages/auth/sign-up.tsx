import React, { Fragment, useEffect, useState } from "react"
import logo from "@/assets/logo.svg"
import { Icon } from "@iconify/react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setItem } from "@/utils/localStorage"
import { PasswordStrength } from "@/components/shared"
import { AnimatePresence, motion } from "framer-motion"
import { useRegister, useSetPassword } from "@/services/hooks/mutations"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Button, CheckBox, InputField } from "@/components/core"
import { changePasswordSchema, registerSchema } from "@/validations/auth"

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [link, setLink] = useState("")
    const [step, setStep] = useState("")
    const { mutate, isPending } = useRegister((v) => {
        setLink(v.split("?l=")?.at(1) as string)
        setSearchParams({ step: "confirm-email" })
        setStep("confirm-email")
    })

    const { mutate: setPassword, isPending: isSettingPassword } = useSetPassword(() => backToLogin())
    
    const registerForm = useFormikWrapper({
        initialValues: {
            email: "",
            terms: false
        },
        validationSchema: registerSchema,
        onSubmit: () => {
            mutate({ email: registerForm.values.email })
        }
    })
    
    const { register, values, isValid, handleSubmit } = useFormikWrapper({
        initialValues: {
            password: "",
            confirm_password: ""
        },
        validationSchema: changePasswordSchema,
        onSubmit: () => {
            setPassword({ link, password: values.password })
        }
    })

    const backToLogin = () => {
        setItem("newPass", "newPass")
        navigate("/auth/login")
    }

    useEffect(() => {
        const possibleLink = searchParams.get("l") as string
        const linkStep = searchParams.get("step") as string
        if (possibleLink) {
            setStep("create-password")
            setLink(possibleLink)
        } else if (linkStep) {
            setStep(linkStep)
        } else {
            setStep("create-account")
        }
    },[])
    return (
        <Fragment>
        <AnimatePresence mode="popLayout">
            {
                step === "create-account" && (
                    <motion.form onSubmit={registerForm.handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <div className="grid p-6 place-content-center mx-auto">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Create a new account</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Please provide a valid email address to get started with Neesilo</p>
                        </div>
                        <div className="grid gap-4">
                            <InputField label="Email Address" type="text" size="40" placeholder="Enter your email address" {...registerForm.register("email")} />
                        </div>
                        <CheckBox
                            label={<div className="text-sm text-gray-900">I agree to Neesilo Terms & Conditions</div>}
                            checked={registerForm.values.terms}
                            onChange={(v) => registerForm.setFieldValue("terms", v, true)}
                        />
                        <div className="grid gap-4">
                            <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !registerForm.isValid} block>Create Account</Button>
                            <Button type="button" theme="primary" variant="ghost" size="40" onClick={() => navigate("/auth/login")} block>Login</Button>
                        </div>
                    </motion.form>
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
                    <motion.form onSubmit={handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
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
                            <InputField label="Confirm Password" type="password" size="40" placeholder="Enter your password" iconRight="ri:key-line" {...register("confirm_password")} />
                        </div>
                        <Button type="submit" theme="primary" variant="filled" size="40" loading={isSettingPassword} disabled={isSettingPassword || !isValid} block>Create Password</Button>
                    </motion.form>
                )
            }
        </AnimatePresence>
        </Fragment>
    )
}