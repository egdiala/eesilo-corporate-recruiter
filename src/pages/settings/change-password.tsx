import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { Button, ContentDivider, InputField } from "@/components/core"
import { AnimatePresence, motion } from "framer-motion"
import { changePasswordSchema } from "@/validations/auth"
import { pageVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"

export const ChangePasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(true)

    const { handleSubmit, isValid: isPasswordValid, register } = useFormikWrapper({
        initialValues: {
            email_code: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit: () => {
            setIsAuth(false)
        },
    })

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
            <div className="flex flex-col gap-0 view-page-container overflow-hidden">
                <div className="flex items-center gap-2.5 py-5 px-8 border-b border-b-gray-200 bg-white">
                    <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate("/settings")}>
                        <Icon icon="ri:arrow-left-s-line" className="size-5" />
                        Back
                    </Button>
                    <h1 className="text-lg text-gray-900">Change Password</h1>
                </div>
                <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px:4 lg:px-8 pt-5 pb-10">
                    <div className="bg-white rounded-2xl p-4 lg:p-8">
                        <AnimatePresence mode="popLayout">
                            {
                                isAuth && (
                                    <motion.form variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[27.25rem] w-full mx-auto">
                                        <div className="grid gap-2">
                                            <h1 className="font-medium text-lg text-gray-900">Authentication Code</h1>
                                            <p className="text-base text-gray-400">Provide the code sent to you</p>
                                        </div>
                                        <div className="flex flex-col py-4 gap-4">
                                            <InputField type="password" label="Code" placeholder="• • • • • • • • • •" size="40" {...register("email_code")} required />
                                        </div>
                                        <ContentDivider />
                                        <div className="grid gap-2">
                                            <h1 className="font-medium text-lg text-gray-900">Create New Password</h1>
                                            <p className="text-base text-gray-400">You can now create new password to secure your account</p>
                                        </div>
                                        <div className="flex flex-col py-4 gap-4">
                                            <InputField type="password" label="New Password" placeholder="• • • • • • • • • •" size="40" {...register("password")} required />
                                            <InputField type="password" label="Confirm Password" placeholder="• • • • • • • • • •" size="40" {...register("confirm_password")} required />
                                        </div>
                                        <Button type="submit" theme="primary" variant="filled" size="40" disabled={!isPasswordValid} block>Continue</Button>
                                    </motion.form>
                                )
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}