import React, { Fragment, useState } from "react"
import logo from "@/assets/logo.svg"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { Button, InputField } from "@/components/core"
import { PasswordStrength } from "@/components/shared"
import { AnimatePresence, motion } from "framer-motion"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { changePasswordSchema, forgotPasswordSchema } from "@/validations/auth"
import { useConfirmRegistrationLink, useForgotPassword, useSetPassword } from "@/services/hooks/mutations"
import { PasswordInput } from "@/components/core/Input/PasswordInput"

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [link, setLink] = useState("")
    const [step, setStep] = useState("forgot-password")
    const { mutate: setPassword, isPending: isSettingPassword } = useSetPassword(() => setStep("success"))
    const { mutate: confirmLink, isPending: isConfirming } = useConfirmRegistrationLink(() => setStep("reset-password"))
    const { mutate: sendResetLink, isPending: isSending } = useForgotPassword((value) => {
        const link = value?.split("?l=")?.at(1) as string
        setLink(link)
        confirmLink({ link })
    })
    
    const forgotPasswordForm = useFormikWrapper({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: () => {
            sendResetLink(forgotPasswordForm.values)
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
    return (
        <Fragment>
            <AnimatePresence mode="popLayout">
                {
                    step === "forgot-password" && (
                    <motion.form onSubmit={forgotPasswordForm.handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <img src={logo} alt="neesilo_logo" className="mx-auto" />
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Forgot Password?</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Please input your registered mail to reset your password</p>
                        </div>
                        <InputField label="Email Address" type="text" size="40" placeholder="Enter your email address" {...forgotPasswordForm.register("email")} />
                        <Button type="submit" theme="primary" variant="filled" size="40" loading={isSending || isConfirming} disabled={isSending || isConfirming || !forgotPasswordForm.isValid} block>Continue</Button>
                    </motion.form>
                    )
                }
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {
                    step === "reset-password" && (
                    <motion.form onSubmit={handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <img src={logo} alt="neesilo_logo" className="mx-auto" />
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Reset Password?</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Secure your account by creating a strong password.</p>
                        </div>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <PasswordInput label="Password" size="40" placeholder="Enter your password" {...register("password")} />
                                <PasswordStrength value={values.password} />
                            </div>
                            <PasswordInput label="Confirm Password" size="40" placeholder="Enter your password again" {...register("confirm_password")} />
                        </div>
                        <Button type="submit" theme="primary" variant="filled" size="40" loading={isSettingPassword} disabled={isSettingPassword || !isValid} block>Done</Button>
                    </motion.form>
                    )
                }
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {
                    step === "success" && (
                    <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 w-full md:max-w-96">
                        <div className="grid p-6 place-content-center mx-auto">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="grid w-full">
                            <div className="flex flex-col gap-4 items-center p-5 border-x border-t border-x-gray-200 border-t-gray-200 rounded-t-2xl">
                                <div className="size-10 grid place-content-center rounded-[0.625rem] bg-success-50">
                                    <Icon icon="ri:checkbox-circle-fill" className="text-success-500 size-6" />
                                </div>
                                <div className="grid gap-1">
                                    <h1 className="font-medium text-base text-gray-900 text-center">Password reset successful</h1>
                                    <p className="text-sm text-gray-500 text-center">You have successfully reset your password, you’d be redirected to login or you can click the button</p>
                                </div>
                            </div>
                            <div className="flex items-center py-4 px-5 border border-gray-200 rounded-b-2xl">
                                <Button theme="primary" variant="filled" size="36" onClick={() => navigate("/auth/login")} block>Back to login</Button>
                            </div>
                        </div>
                    </motion.div>
                    )
                }
            </AnimatePresence>
        </Fragment>

    )
}