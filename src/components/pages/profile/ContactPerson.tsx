import React, { Fragment, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, InputField, RenderIf } from "@/components/core"

export const ContactPerson: React.FC = () => {
    const [editMode, setEditMode] = useState(false)
    const information = [
        { label: "Name", value: "Samuel John" },
        { label: "Job Title", value: "Administrative Staff" },
        { label: "Phone Number", value: "+1 950 049 5049" },
        { label: "Email", value: "samueljohn@mail.com" },
    ]
    return (
        <Fragment>
            <RenderIf condition={editMode}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <h2 className="font-medium text-lg text-gray-900">Edit Contact Person</h2>
                        <p className="text-base text-gray-400">Provide basic information about your organization.</p>
                    </div>
                    <hr />
                    <InputField label="Name of Contact Person" placeholder="Name" size="40" type="text" required />
                    <InputField label="Job Title" placeholder="Job title" size="40" type="text" required />
                    <InputField label="Phone Number" placeholder="(555) 000-0000" size="40" type="text" required />
                    <InputField label="Email" placeholder="Email" size="40" type="text" required />
                    <Button theme="primary" variant="filled" size="40">Save Changes</Button>
                </motion.div>
            </RenderIf>
            <RenderIf condition={!editMode}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col bg-gray-25 rounded-2xl p-5 gap-3">
                    <div className="flex items-start">
                        <h2 className="flex-1 font-medium text-lg text-gray-900">Contact Person</h2>
                        <Button type="button" theme="primary" variant="lighter" size="36" onClick={() => setEditMode(true)}>
                            <Icon icon="ri:edit-2-line" className="size-5" />
                            Edit
                        </Button>
                    </div>
                    <hr />
                    {
                        information.map((info) =>
                            <div key={info.label} className="flex items-center justify-between py-3">
                                <span className="text-gray-500 text-sm">{info.label}</span>
                                <span className="text-gray-900 text-base font-medium">{info.value}</span>
                            </div>
                        )
                    }
                </motion.div>
            </RenderIf>
        </Fragment>
    )
}