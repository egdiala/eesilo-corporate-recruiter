import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import type { FetchedTalent } from "@/types/applicants";
import { useShortlistApplicant } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/libs/cn";
import { useParams } from "react-router-dom";

interface AddToShortlistProps {
    isOpen: boolean;
    onClose: () => void;
    talent: FetchedTalent;
}

export const AddToShortlist: React.FC<AddToShortlistProps> = ({ isOpen, onClose, talent }) => {
    const { id: job_id } = useParams()
    const plans = [
        { name: "High", className: "bg-warning-50 border-warning-50 text-warning-500 data-[checked]:border-warning-500", value: "2" },
        { name: "Medium", className: "bg-primary-50 border-primary-50 text-primary-500 data-[checked]:border-[#1FC16B]", value: "1" },
        { name: "Low", className: "bg-blue-50 border-blue-50 text-blue-500 data-[checked]:border-blue-500", value: "0" },
    ] as { name: string; className: string; value: "2" | "1" | "0" }[]
    const [selected, setSelected] = useState<{ name: string; className: string; value: "2" | "1" | "0" } | null>(null)
    const { mutate, isPending } = useShortlistApplicant("Candidate shortlisted successfully!", () => close())
    
    const addToShortlist = () => {
        const payload = {
            job_id: job_id as string,
            user_id: talent?.user_id,
            invite_status: "0" as "2" | "1" | "0" | "3" | "4",
        }
        if (selected?.value) {
            mutate({ ...payload, priority: selected.value as "2" | "1" | "0" })
        } else {
           mutate({ ...payload }) 
        }
    }

    const close = () => {
        onClose();
        setSelected(null);
    }
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col items-center gap-4 p-5">
                            <div className="grid place-content-center bg-success-50 rounded-[0.625rem] p-2">
                                <Icon icon="ri:checkbox-circle-fill" className="text-success-500 size-6" />
                            </div>
                            <div className="grid gap-1 text-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Add to Shortlist
                                </DialogTitle>
                                <p className="text-sm text-gray-500">
                                    Select candidate priority
                                </p>
                            </div>
                            <RadioGroup by={"name" as any} value={selected} onChange={setSelected} aria-label="Server size" className="flex items-center gap-2.5 max-w-60 w-full">
                            {plans.map((plan) => (
                                <Radio
                                key={plan.name}
                                value={plan}
                                className={cn("flex items-center select-none justify-center border cursor-pointer rounded-full py-2 px-3 transition duration-500 ease-out focus:outline-none flex-1", plan.className)}
                                >
                                {plan.name}
                                </Radio>
                            ))}
                            </RadioGroup>
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="40" block disabled={isPending} onClick={close}>Dismiss</Button>
                            <Button type="button" theme="primary" variant="filled" size="40" block disabled={isPending} loading={isPending} onClick={() => addToShortlist()}>Yes, Add to Shortlist</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}