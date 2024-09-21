import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { useRemoveShortlisted } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedShortlistedCandidate } from "@/types/applicants";

interface DeleteShortlistProps {
    isOpen: boolean;
    onClose: () => void;
    talent: FetchedShortlistedCandidate;
}

export const DeleteShortlist: React.FC<DeleteShortlistProps> = ({ isOpen, onClose, talent }) => {
    const { mutate, isPending } = useRemoveShortlisted("Candidate removed successfully!", () => onClose())
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col items-center gap-4 p-5">
                            <div className="grid place-content-center bg-warning-50 rounded-[0.625rem] p-2">
                                <Icon icon="ri:alert-fill" className="text-warning-500 size-6" />
                            </div>
                            <div className="grid gap-1 text-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Remove Candidate
                                </DialogTitle>
                                <p className="text-sm text-gray-500">
                                    Delist this candidate from shortlisted candidates for this job.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="40" block disabled={isPending} onClick={onClose}>Dismiss</Button>
                            <Button type="button" theme="error" variant="filled" size="40" block disabled={isPending} loading={isPending} onClick={() => mutate({ user_id: talent?.user_id as string, job_id: talent?.job_id })}>Yes, Remove</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}