import React, { Fragment, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, InputField, RenderIf, SelectInput } from "@/components/core"

export const OrganizationInformation: React.FC = () => {
    const [editMode, setEditMode] = useState(false)
    const information = [
        { label: "Organisations name", value: "Samuel" },
        { label: "Phone Number", value: "+1 4833 8392" },
        { label: "Country", value: "United States" },
        { label: "State", value: "Michigan" },
        { label: "City", value: "Sample text" },
        { label: "Address", value: "Sample text" },
        { label: "Zip Code", value: "54213" },
        { label: "Website", value: "www.sample.com" },
    ]
    return (
        <Fragment>
            <RenderIf condition={editMode}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex items-start">
                        <div className="flex-1 grid gap-2">
                            <h2 className="font-medium text-lg text-gray-900">Organization’s Information</h2>
                            <p className="text-base text-gray-400">Provide basic information about your organization.</p>
                        </div>
                        <Button type="button" theme="error" variant="lighter" size="36" onClick={() => setEditMode(false)}>
                            Dismiss
                        </Button>

                    </div>
                    <hr />
                    <InputField label="Organization’s Name" placeholder="Organisation name" size="40" type="text" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Telephone Number" placeholder="(555) 000-0000" size="40" type="text" required />
                        <SelectInput label="Country" placeholder="Country" size="40" options={[]} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectInput label="State" placeholder="Select state" size="40" type="text" options={[]} required />
                        <SelectInput label="City" placeholder="Select city" size="40" type="text" options={[]} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Address" placeholder="Address" size="40" type="text" required />
                        <InputField label="Zip code" placeholder="Zip code" size="40" type="text" required />
                    </div>
                    <InputField label="Company Website" placeholder="Website" size="40" type="text" required />
                    <Button theme="primary" variant="filled" size="40">Save Changes</Button>
                </motion.div>
            </RenderIf>
            <RenderIf condition={!editMode}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col bg-gray-25 rounded-2xl p-5 gap-3">
                    <div className="flex items-start">
                        <h2 className="flex-1 font-medium text-lg text-gray-900">Organization’s Information</h2>
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