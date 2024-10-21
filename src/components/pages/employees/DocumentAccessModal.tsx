import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import type { RequestDocumentParams } from "@/types/applicants";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRequestDocumentAccess } from "@/services/hooks/mutations";

interface DocumentAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    params: RequestDocumentParams;
}

export const DocumentAccessModal: React.FC<DocumentAccessModalProps> = ({ isOpen, onClose, onSuccess, params }) => {
    const { mutate, isPending } = useRequestDocumentAccess("Request sent successfully!", () => onSuccess())
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[27.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col items-center gap-4 p-5">
                            <div className="grid place-content-center bg-error-50 rounded-[0.625rem] p-2">
                                <Icon icon="ri:error-warning-fill" className="text-error-500 size-6" />
                            </div>
                            <div className="grid gap-1 text-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Request access to this folder
                                </DialogTitle>
                                <p className="text-sm text-gray-500">
                                    A request will be sent to the candidate.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="36" block disabled={isPending} onClick={onClose}>Dismiss</Button>
                            <Button type="button" theme="primary" variant="filled" size="36" block disabled={isPending} loading={isPending} onClick={() => mutate(params)}>Send Request</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}