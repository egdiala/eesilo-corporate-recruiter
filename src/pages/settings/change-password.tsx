import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { pageVariants } from "@/constants/animateVariants"
import { getItem, removeItem } from "@/utils/localStorage"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { confirmUpdatePasswordSchema } from "@/validations/settings"
import { useConfirmUpdatePassword } from "@/services/hooks/mutations"
import { Button, ContentDivider, InputField } from "@/components/core"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

export const ChangePasswordPage: React.FC = () => {
    const navigate = useNavigate()
    const [isAuth, setIsAuth] = useState(false)
        const changePassword = getItem<string>("change-password")

    const { mutate: confirmUpdate, isPending: isConfirming } = useConfirmUpdatePassword(() => {
        setIsAuth(true)
        removeItem("change-password")
    })

    const { handleSubmit, isValid: isPasswordValid, register, values } = useFormikWrapper({
        initialValues: {
            code: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: confirmUpdatePasswordSchema,
        onSubmit: () => {
            const { code, password } = values
            confirmUpdate({ code, password })
        },
    })

    useEffect(() => {

        if (!changePassword) {
            navigate("/settings/security")
        }
    },[])

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
                <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px-4 lg:px-8 pt-5 pb-10">
                    <div className="bg-white rounded-2xl p-4 lg:p-8">
                        <AnimatePresence mode="popLayout">
                            <motion.form variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[27.25rem] w-full mx-auto">
                                <div className="grid gap-2">
                                    <h1 className="font-medium text-lg text-gray-900">Authentication Code</h1>
                                    <p className="text-base text-gray-400">Provide the code sent to your {changePassword}</p>
                                </div>
                                <div className="flex flex-col py-4 gap-4">
                                    <InputField type="password" label="Code" placeholder="• • • • • • • • • •" size="40" {...register("code")} required />
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
                                <Button type="submit" theme="primary" variant="filled" size="40" disabled={!isPasswordValid || isConfirming} loading={isConfirming} block>Continue</Button>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <Dialog open={isAuth} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsAuth(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-4 p-5">
                                <div className="grid place-content-center bg-primary-50 rounded-[0.625rem] p-2">
                                    <Icon icon="ri:information-fill" className="text-primary-500 size-6" />
                                </div>
                                <div className="grid gap-1 text-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Password reset successful
                                    </DialogTitle>
                                    <p className="text-sm text-gray-500">
                                        You have successfully reset your password.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="primary" variant="filled" size="36" block onClick={() => navigate("/settings/security")}>Done</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}