import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button, InputField, SelectInput } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export const StaffsAndAccessControl: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Staffs and Access Control</h2>
                <p className="text-base text-gray-400">You can grant access to your staffs to perform different actions.</p>
            </div>
            <hr />
            <button type="button" onClick={() => setIsOpen(true)} className="grid gap-3 py-3.5 border border-dashed border-primary-500 rounded-[0.625rem]">
                <div className="flex flex-col gap-3 items-center w-full mx-auto max-w-64">
                    <Icon icon="ri:add-circle-line" className="size-6 text-primary-500" />
                    <p className="text-sm text-gray-500 text-center">Grant a new user access control over your account</p>
                </div>
            </button>
            <Button theme="primary" variant="filled" size="40">Save and continue</Button>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[30rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col gap-1 py-4 pr-4 pl-5 border-b border-b-gray-200">
                                <div className="flex items-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Create Staff and Access
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={() => setIsOpen(false)}>
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
                                <Button type="button" theme="neutral" variant="stroke" size="40" block onClick={() => setIsOpen(false)}>Cancel</Button>
                                <Button type="button" theme="primary" variant="filled" size="40" block>Create</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}