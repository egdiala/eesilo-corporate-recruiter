import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button, CheckBox, ContentDivider, InputField } from "@/components/core";

interface AddPaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="flex flex-col gap-6 w-full max-w-[49.75rem] p-8 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 p-4 justify-between">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-lg font-medium text-gray-900">
                                    Upcoming Interviews
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={onClose}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Add a new payment method to continue with the purchase of your plan.</p>
                        </div>
                        <div className="flex flex-col p-4 gap-4 border border-gray-200 rounded-xl">
                            <h2 className="font-medium text-base text-gray-900">Card Details</h2>
                            <ContentDivider />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Card Number" placeholder="0000 0000 0000 0000" iconRight="ri:bank-card-line" type="text" required />
                                <InputField label="Name on Card" placeholder="Name on Card" type="text" required />
                                <InputField label="Expiry Date" placeholder="DD / MM / YYYY" type="text" required />
                                <InputField label="CVV" placeholder="• • •" type="text" required />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <CheckBox label="Save billing information for next subscription" />
                            <CheckBox label={<Fragment>I agree to the <span className="text-primary-500 underline underline-offset-2">Terms</span> and <span className="text-primary-500 underline underline-offset-2">Conditions</span> of subscribing to Neesilo</Fragment>} />
                        </div>
                        <div className="flex items-center gap-6">
                            <Button type="button" theme="neutral" variant="stroke" size="40" onClick={onClose} block>Cancel</Button>
                            <Button type="button" theme="primary" variant="filled" size="40" block>Done</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}