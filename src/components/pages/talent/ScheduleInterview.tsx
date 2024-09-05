import React from "react";
import { Icon } from "@iconify/react";
import { Button, InputField } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ScheduleInterviewProps {
    isOpen: boolean;
    close: () => void;
}

export const ScheduleInterview: React.FC<ScheduleInterviewProps> = ({ isOpen, close }) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[28.875rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 py-4 pr-4 pl-5 border-b border-b-gray-200">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Schedule Interview
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={close}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Meet with your potential employee.
                            </p>
                        </div>
                        <form className="grid gap-4 p-4">
                            <InputField label="Select Date" placeholder="Date" size="40" type="text" iconRight="mi:calendar" required />
                            <InputField label="Select Time" placeholder="Time" size="40" type="text" iconRight="mi:clock" required />
                            <InputField
                                required
                                size="40"
                                type="text"
                                label="Meeting Link"
                                placeholder="Paste meeting link"
                                help={<><Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" /> Create your meeting link using meeting platform (eg zoom, google meet) and paste it here.</>}
                            />
                            <InputField label="Note (optional)" placeholder="Enter note" size="40" type="text" />
                        </form>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="40" block onClick={close}>Cancel</Button>
                            <Button type="button" theme="primary" variant="filled" size="40" block>Schedule Meeting</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}