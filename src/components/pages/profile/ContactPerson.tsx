import React, { Fragment, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, InputField, PhoneInput, RenderIf } from "@/components/core"
import { FetchedAccount } from "@/types/account"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { onboardContactPersonSchema } from "@/validations/onboarding"
import { formatPhoneNumber, parsePhoneNumber } from "react-phone-number-input"
import { useUpdateAccount } from "@/services/hooks/mutations"
import { useGetCountries } from "@/services/hooks/queries"
import parsePhoneNumberFromString from "libphonenumber-js"

interface ContactPersonProps {
    account: FetchedAccount;
}

export const ContactPerson: React.FC<ContactPersonProps> = ({ account }) => {
    const [editMode, setEditMode] = useState(false)
    const { mutate, isPending } = useUpdateAccount("Contact person info edited successfully", () => setEditMode(false))

    const { data: countries } = useGetCountries()

    const phoneNumber = useMemo(() => {
        if (account?.phone_number) {
            const phone_number = account?.phone_number as string
            const countryCallingCode = `${account?.phone_prefix as string}`
            const country = countries?.filter((country) => country?.phone_code === countryCallingCode)?.[0]

            const parsedPhoneNumber = parsePhoneNumberFromString(phone_number, country?.iso2 as any)?.format("E.164")

            return { parsedPhoneNumber, country }
        } else {
            return { parsedPhoneNumber: "", country: { iso2: "US" } }
        }
    },[account?.phone_number, account?.phone_prefix, countries])
    
    const { errors, handleSubmit, isValid, dirty, register, setFieldValue, values, resetForm } = useFormikWrapper({
        initialValues: {
            name: account?.contact_person?.name || "",
            job_title: account?.contact_person?.job_title || "",
            phone_number: phoneNumber?.parsedPhoneNumber || "",
            email: account?.contact_person?.email || "",
        },
        enableReinitialize: true,
        validationSchema: onboardContactPersonSchema,
        onSubmit: () => {
            const formattedPhoneNumber = formatPhoneNumber(values.phone_number).split(" ").join("")
            const parsedPhoneNumber = parsePhoneNumber(values.phone_number)
            const contact_person = {
                email: values.email,
                phone_prefix: parsedPhoneNumber?.countryCallingCode,
                name: values.name,
                job_title: values.job_title,
                phone_number: formattedPhoneNumber,
            }
            mutate({ contact_person })
        },
    })
    const information = useMemo(() => {
        return [
            { label: "Name", value: account?.contact_person?.name },
            { label: "Job Title", value: account?.contact_person?.job_title },
            { label: "Phone Number", value: account?.contact_person?.phone_number },
            { label: "Email", value: account?.contact_person?.email },
        ]
    }, [account?.contact_person?.email, account?.contact_person?.job_title, account?.contact_person?.name, account?.contact_person?.phone_number])
    
    const dismiss = () => {
        setEditMode(false)
        resetForm()
    }
    return (
        <Fragment>
            <RenderIf condition={editMode}>
                <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex items-start">
                        <div className="flex-1 grid gap-2">
                            <h2 className="font-medium text-lg text-gray-900">Edit Contact Person</h2>
                            <p className="text-base text-gray-400">Provide basic information about your organization.</p>
                        </div>
                        <Button type="button" theme="error" variant="lighter" size="36" onClick={() => dismiss()}>
                            Dismiss
                        </Button>
                    </div>
                    <hr />
                    <InputField label="Name of Contact Person" placeholder="Name" size="40" type="text" {...register("name")} required />
                    <InputField label="Job Title" placeholder="Job title" size="40" type="text" {...register("job_title")} required />
                    <PhoneInput label="Phone Number" placeholder="(555) 000-0000" size="40" type="text" defaultCountry={phoneNumber?.country?.iso2} value={values.phone_number} onChange={(v) => setFieldValue("phone_number", v, true)} error={errors.phone_number} required />
                    <InputField label="Email" placeholder="Email" size="40" type="text" {...register("email")} required />
                    <div className="w-32">
                        <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid || !dirty} block>Save Changes</Button>
                    </div>
                </motion.form>
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
                                <span className="text-gray-900 text-base font-medium">{info.value || "-"}</span>
                            </div>
                        )
                    }
                </motion.div>
            </RenderIf>
        </Fragment>
    )
}