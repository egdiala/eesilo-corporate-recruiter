import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface DocumentRequestSendModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DocumentRequestSendModal: React.FC<DocumentRequestSendModalProps> = ({ isOpen, onClose }) => {
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[27.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col items-center gap-4 p-5">
                            <div className="grid place-content-center bg-primary-25 rounded-[0.625rem] p-2">
                                <Icon icon="ri:send-plane-line" className="text-success-500 size-6" />
                            </div>
                            <div className="grid gap-1 text-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Request Sent
                                </DialogTitle>
                                <p className="text-sm text-gray-500">
                                    A PII code will sent to you once the candidate accepts your request. You will find it in the job progress section.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="primary" variant="filled" size="40" block onClick={onClose}>Ok</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}