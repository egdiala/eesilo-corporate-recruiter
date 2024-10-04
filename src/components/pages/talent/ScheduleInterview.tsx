import React from "react";
import { add, format } from "date-fns";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import type { FetchedJob } from "@/types/jobs";
import "react-datepicker/dist/react-datepicker.css";
import { Button, InputField } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { scheduleInterviewSchema } from "@/validations/job";
import { useShortlistApplicant } from "@/services/hooks/mutations";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { FetchedShortlistedCandidate } from "@/types/applicants";

interface ScheduleInterviewProps {
    isOpen: boolean;
    close: () => void;
    job?: FetchedJob;
    talent?: FetchedShortlistedCandidate;
}

export const ScheduleInterview: React.FC<ScheduleInterviewProps> = ({ isOpen, close, job, talent }) => {
    const { mutate, isPending } = useShortlistApplicant(`Job interview scheduled with ${talent?.user_data?.first_name} ${talent?.user_data?.last_name}`, () => close())
    
    const { handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            time: "",
            date: "",
            meeting_link: "",
            comment: ""
        },
        validationSchema: scheduleInterviewSchema,
        onSubmit: () => {
            const { time, date, ...rest } = values
            mutate({
                job_id: job?.job_id as string,
                user_id: talent?.user_id as string,
                invite_status: "2",
                interview_data: { ...rest, date: format(date, "yyyy-MM-dd"), time: format(time, "HH:mm"), timezone: new Date().getTimezoneOffset().toString()}
            })
        },
    })

    const onClose = () => {
        close();
        resetForm();
    }
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="w-full max-w-[28.875rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 py-4 pr-4 pl-5 border-b border-b-gray-200">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Schedule Interview
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={onClose}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Meet with your potential employee.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} id="interview" className="grid gap-4 p-4">
                            <div className="grid">
                                <DatePicker
                                    selected={values?.date as any}
                                    onChange={(date) => setFieldValue("date", date)}
                                    minDate={add(new Date(), { days: 1 })}
                                    required
                                    customInput={<InputField label="Select Date" placeholder="Date" size="40" type="text" iconRight="mi:calendar" {...register("date")} />}
                                />
                            </div>
                            <div className="grid">
                                <DatePicker
                                    selected={values?.time as any}
                                    onChange={(time) => setFieldValue("time", time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    showTimeCaption={false}
                                    required
                                    customInput={<InputField label="Select Time" placeholder="Time" size="40" type="text" iconRight="mi:clock" />}
                                />
                            </div>
                            <InputField
                                required
                                size="40"
                                type="text"
                                label="Meeting Link"
                                placeholder="Paste meeting link"
                                {...register("meeting_link")}
                                help={<><Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" /> Create your meeting link using meeting platform (eg zoom, google meet) and paste it here.</>}
                            />
                            <InputField label="Note" placeholder="Enter note" size="40" type="text" optional {...register("comment")} />
                        </form>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="40" block onClick={onClose}>Cancel</Button>
                            <Button type="submit" form="interview" theme="primary" variant="filled" size="40" disabled={isPending || !isValid} loading={isPending} block>Schedule Meeting</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}