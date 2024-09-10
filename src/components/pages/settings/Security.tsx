import React, { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, InputField, Toggle } from "@/components/core"
import { Icon } from "@iconify/react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"


export const Security: React.FC = () => {
    const [toggleModals, setToggleModals] = useState({
        openChangeEmail: false,
        openChangePassword: false,
    })

    const toggleChangeEmail = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openChangeEmail: !toggleModals.openChangeEmail,
      }))
    }, [toggleModals.openChangeEmail])

    const toggleChangePassword = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openChangePassword: !toggleModals.openChangePassword,
      }))
    }, [toggleModals.openChangePassword])
    
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Security</h1>
                <p className="text-base text-gray-400">Edit and update security details to get your account secured</p>
            </div>
            <hr className="border-[#E2E4E9]" />
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-6">
                    <div className="grid gap-2 flex-1">
                        <h2 className="font-medium text-sm text-gray-900">Enable 2Factor Authentication</h2>
                        <p className="text-sm text-gray-500">Agree to receive OTP Authentication with your registered email address and phone number securely</p>
                    </div>
                    <Toggle />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-medium text-sm text-gray-900">Choose OTP Channel</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Email</span>
                            <Toggle />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Phone Number</span>
                            <Toggle />
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="flex items-center gap-6" onClick={toggleChangeEmail}>
                <div className="grid gap-2 text-left flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Email Address</h2>
                    <p className="text-sm text-gray-500">Update your email address</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </button>
            <button type="button" className="flex items-center gap-6" onClick={toggleChangePassword}>
                <div className="grid gap-2 text-left flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Password</h2>
                    <p className="text-sm text-gray-500">Update your password</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </button>
            <Dialog open={toggleModals.openChangeEmail} as="div" className="relative z-10 focus:outline-none" onClose={toggleChangeEmail}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-1 py-4 pl-5 pr-4 border-b border-b-gray-200">
                                <div className="flex items-center w-full gap-2 justify-between">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Request Change of Email
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleChangeEmail}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Codes will be sent to your email and phone number. Provide password to proceed.
                                </p>
                            </div>
                            <div className="p-4">
                                <InputField label="Password" placeholder="• • • • • • • • • •" size="40" type="password" required />
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" block onClick={toggleChangeEmail}>Cancel</Button>
                                <Button type="button" theme="primary" variant="filled" size="36" block>Yes, Proceed</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={toggleModals.openChangePassword} as="div" className="relative z-10 focus:outline-none" onClose={toggleChangePassword}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-1 py-4 pl-5 pr-4 border-b border-b-gray-200">
                                <div className="flex items-center w-full gap-2 justify-between">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Request Change of Password
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleChangePassword}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Codes will be sent to your email and phone number. Provide password to proceed.
                                </p>
                            </div>
                            <div className="p-4">
                                <InputField label="Password" placeholder="• • • • • • • • • •" size="40" type="password" required />
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" block onClick={toggleChangePassword}>Cancel</Button>
                                <Button type="button" theme="primary" variant="filled" size="36" block>Yes, Proceed</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}