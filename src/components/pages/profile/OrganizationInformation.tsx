import React, { Fragment, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { FetchedAccount } from "@/types/account"
import { tabVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { formatPhoneNumber } from "react-phone-number-input"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { onboardOrganizationInfoSchema } from "@/validations/onboarding"
import { useUpdateAccount, useUploadLogo } from "@/services/hooks/mutations"
import { Button, ComboBox, ImageUpload, InputField, PhoneInput, RenderIf } from "@/components/core"
import { useGetCitiesByStateAndCountry, useGetCountries, useGetStatesByCountry } from "@/services/hooks/queries"

interface OrganizationInformationProps {
    account: FetchedAccount;
}

export const OrganizationInformation: React.FC<OrganizationInformationProps> = ({ account }) => {
    const { mutate, isPending } = useUpdateAccount("Organization information edited successfully")
    const { mutateAsync: uploadLogo, isPending: isUploading } = useUploadLogo()
    const [query, setQuery] = useState({
        country: "",
        state: "",
        city: ""
    })

    const { data: countries, isFetching: fetchingCountries } = useGetCountries()

    const phoneNumber = useMemo(() => {
        if (account?.phone_number) {
            const phone_number = account?.phone_number as string
            const countryCallingCode = `${account?.phone_prefix as string}`
            const country = countries?.filter((country) => country?.phonecode === countryCallingCode)?.[0]

            const parsedPhoneNumber = parsePhoneNumberFromString(phone_number, country?.iso2 as any)?.format("E.164")

            return { parsedPhoneNumber, country }
        } else {
            return { parsedPhoneNumber: "", country: { iso2: "US" } }
        }
    },[account?.phone_number, account?.phone_prefix, countries])
    
    const { errors, handleSubmit, isValid, dirty, register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: account?.name || "",
            file: account?.avatar || "" as unknown,
            phone_number: phoneNumber?.parsedPhoneNumber || "",
            website: account?.website || "",
            country: account?.address_data?.country || "",
            state: account?.address_data?.state || "",
            city: account?.address_data?.city || "",
            address: account?.address_data?.address || "",
            zip_code: account?.address_data?.zip_code || ""
        },
        validationSchema: onboardOrganizationInfoSchema,
        enableReinitialize: true,
        onSubmit: () => {
            const { name, phone_number, website, file } = values
            const address_data = {
                country: values.country,
                country_code: selectedCountry?.phonecode,
                state: values.state,
                city: values.city,
                address: values.address,
                zip_code: values.zip_code
            }

            if ((file as File)?.size > 0) {
                const formData = new FormData();
                formData.append("file", values.file as File);
                uploadLogo(formData).then(() => mutate({ address_data, name, phone_number: formatPhoneNumber(phone_number).split(" ").join(""), website, phone_prefix: selectedCountry?.phonecode }))
            } else {
                mutate({ address_data, name, phone_number: formatPhoneNumber(phone_number).split(" ").join(""), website, phone_prefix: selectedCountry?.phonecode })
            }
        },
    })
    const fetchedCountries = query.country === ""
        ? countries
        : countries?.filter((country) => {
            return country.name.toLowerCase().includes(query.country.toLowerCase())
            })

    const selectedCountry = useMemo(() => {
        return countries?.filter((item) => item?.name === values?.country)?.at(0)
    },[countries, values?.country])

    const { data: states, isFetching: fetchingStates } = useGetStatesByCountry(selectedCountry?.iso2 as string)
    const fetchedStates = query.state === ""
        ? states
        : states?.filter((state) => {
            return state.name.toLowerCase().includes(query.state.toLowerCase())
            })

    const selectedState = useMemo(() => {
        return states?.filter((item) => item?.name === values?.state)?.at(0)
    },[states, values?.state])

    const { data: cities, isFetching: fetchingCities } = useGetCitiesByStateAndCountry({ country: selectedCountry?.iso2 as string, state: selectedState?.iso2 as string })
    const fetchedCities = query.city === ""
        ? cities
        : cities?.filter((city) => {
            return city.name.toLowerCase().includes(query.city.toLowerCase())
            })

    
    const [editMode, setEditMode] = useState(false)
    const information = useMemo(() => {
        return [
            { label: "Organisations name", value: account?.name },
            { label: "Phone Number", value: account?.phone_number },
            { label: "Country", value: account?.address_data?.country },
            { label: "State", value: account?.address_data?.state },
            { label: "City", value: account?.address_data?.city },
            { label: "Address", value: account?.address_data?.address },
            { label: "Zip Code", value: account?.address_data?.zip_code },
            { label: "Website", value: account?.website },
        ]
    },[account?.address_data?.address, account?.address_data?.city, account?.address_data?.country, account?.address_data?.state, account?.address_data?.zip_code, account?.name, account?.phone_number, account?.website])
    return (
        <Fragment>
            <RenderIf condition={editMode}>
                <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
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
                    <ImageUpload image={account?.avatar} onReset={() => setFieldValue("file", account?.avatar || "" as unknown, true)} size="64" type="company" setFile={(file) => setFieldValue("file", file, true)} showActions />
                    <InputField label="Organization’s Name" placeholder="Organisation name" size="40" type="text" {...register("name")} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PhoneInput label="Telephone Number" placeholder="(555) 000-0000" size="40" defaultCountry={phoneNumber?.country?.iso2} value={values.phone_number} onChange={(v) => setFieldValue("phone_number", v, true)} error={errors.phone_number} required />
                        <ComboBox
                            label="Country"
                            disabled={fetchingCountries}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                country: "",
                            }))}
                            error={errors.country}
                            options={fetchedCountries ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                country: value,
                            }))} 
                            defaultValue={countries?.filter((country) => country.name.toLowerCase() == account?.address_data?.country?.toLowerCase())?.[0]}
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("country", value?.name)}
                            placeholder="Country"
                            size="40"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ComboBox
                            label="State"
                            disabled={fetchingStates || !values.country}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                state: "",
                            }))}
                            error={errors.state}
                            options={fetchedStates ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                state: value,
                            }))} 
                            defaultValue={states?.filter((state) => state.name.toLowerCase() == account?.address_data?.state?.toLowerCase())?.[0]}
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("state", value?.name)}
                            placeholder="State"
                            size="40"
                            required
                        />
                        <ComboBox
                            label="City"
                            disabled={fetchingCities || !values.state}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                city: "",
                            }))}
                            error={errors.city}
                            options={fetchedCities ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                city: value,
                            }))} 
                            defaultValue={cities?.filter((city) => city.name.toLowerCase() == account?.address_data?.city?.toLowerCase())?.[0]}
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("city", value?.name)}
                            placeholder="Select city"
                            size="40"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Address" placeholder="Address" size="40" type="text" {...register("address")} required />
                        <InputField label="Zip code" placeholder="Zip code" size="40" type="text" {...register("zip_code")} required />
                    </div>
                    <InputField label="Company Website" placeholder="Website" size="40" type="text" {...register("website")} required />
                    <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending || isUploading} disabled={isPending || isUploading || !isValid || !dirty}>Save Changes</Button>
                </motion.form>
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
                    <ImageUpload image={account?.avatar} size="64" type="company" titleText="Company Logo" />
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