import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, ContentDivider, InputField, SelectInput } from "@/components/core"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"


export const StaffAccessControl: React.FC = () => {
    const [toggleModals, setToggleModals] = useState({
        openCreateStaff: false,
        openDeleteStaff: false,
    })

    const toggleCreateStaff = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openCreateStaff: !toggleModals.openCreateStaff,
      }))
    },[toggleModals.openCreateStaff])

    const toggleDeleteStaff = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteStaff: !toggleModals.openDeleteStaff,
      }))
    },[toggleModals.openDeleteStaff])
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Staffs and Access Control</h1>
                <p className="text-base text-gray-400">Create and grant access to members of staff</p>
            </div>
            <ContentDivider />
            <div className="flex flex-col gap-5">
                <div className="grid gap-2.5 p-2.5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <h2 className="font-medium text-base text-gray-900">John Stone</h2>
                            <p className="font-medium text-sm text-gray-600">johnnyuboh@welbridg.com</p>
                            <span className="font-medium text-sm text-gray-600">Administrative Assistant</span>
                        </div>
                        <button type="button" onClick={toggleDeleteStaff}>
                            <Icon icon="ri:delete-bin-line" className="size-6 text-error-600" />
                        </button>
                    </div>
                    <div className="flex items-start gap-1 py-0.5">
                        <Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" />
                        <div className="grid flex-1 text-xs text-gray-500">
                            This job role can:
                            <ul className="list-disc list-inside">
                                <li>Not request and access sensitive documents</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" onClick={toggleCreateStaff} className="grid gap-3 py-3.5 border border-dashed border-primary-500 rounded-[0.625rem]">
                <div className="flex flex-col gap-3 items-center w-full mx-auto max-w-64">
                    <Icon icon="ri:add-circle-line" className="size-6 text-primary-500" />
                    <p className="text-sm text-gray-500 text-center">Grant a new user access control over your account</p>
                </div>
            </button>
            <Dialog open={toggleModals.openDeleteStaff} as="div" className="relative z-10 focus:outline-none" onClose={toggleDeleteStaff}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-4 p-5">
                                <div className="grid place-content-center bg-error-50 rounded-[0.625rem] p-2">
                                    <Icon icon="ri:error-warning-fill" className="text-error-500 size-6" />
                                </div>
                                <div className="grid gap-1 text-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Remove Staff
                                    </DialogTitle>
                                    <p className="text-sm text-gray-500">
                                        This staff will be removed and all access revoked.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" block onClick={toggleDeleteStaff}>Dismiss</Button>
                                <Button type="button" theme="primary" variant="filled" size="36" block>Yes, Remove Staff</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={toggleModals.openCreateStaff} as="div" className="relative z-10 focus:outline-none" onClose={toggleCreateStaff}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[30rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col gap-1 py-4 pr-4 pl-5 border-b border-b-gray-200">
                                <div className="flex items-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Create Staff and Access
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleCreateStaff}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Meet with your potential employee.
                                </p>
                            </div>
                            <form className="grid gap-4 p-4">
                                <InputField label="Name" placeholder="Name" size="40" type="text" required />
                                <InputField label="Email" placeholder="Email" size="40" type="text" required />
                                <SelectInput label="Role" options={[]} required />
                                <SelectInput label="Can request and access sensitive documents from employees?" options={[]} required />
                            </form>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="40" block onClick={toggleCreateStaff}>Cancel</Button>
                                <Button type="button" theme="primary" variant="filled" size="40" block>Create</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}