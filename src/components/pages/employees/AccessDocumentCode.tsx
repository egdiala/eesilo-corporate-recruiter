import React from "react";
import { Icon } from "@iconify/react";
import { Button, InputField } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import type { RequestDocumentParams } from "@/types/applicants";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRequestDocumentAccess } from "@/services/hooks/mutations";
import { accessDocumentSchema } from "@/validations/job";

interface AccessDocumentCodeProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    params: RequestDocumentParams;
}

export const AccessDocumentCode: React.FC<AccessDocumentCodeProps> = ({ isOpen, onClose, onSuccess, params }) => {
    const { mutate, isPending } = useRequestDocumentAccess("Access granted successfully!", () => onSuccess())

    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            code: ""
        },
        validationSchema: accessDocumentSchema,
        onSubmit(values) {
            mutate({ ...params, ...values })
        }
    })
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel as="form" onSubmit={handleSubmit} transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 lg:p-4 justify-between border-b border-b-gray-200">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-lg font-medium text-gray-900">
                                    Enter Code
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={onClose}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Enter the code provided to access the document folder.</p>
                        </div>
                        <div className="p-4">
                            <InputField type="text" label="Code" placeholder="Code" required {...register("code")} />
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="36" block disabled={isPending} onClick={onClose}>Cancel</Button>
                            <Button type="submit" theme="primary" variant="filled" size="36" block disabled={!isValid || isPending} loading={isPending}>Access Folder</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}