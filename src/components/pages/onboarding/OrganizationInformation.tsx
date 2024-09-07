import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { formatPhoneNumber } from "react-phone-number-input";
import { onboardOrganizationInfoSchema } from "@/validations/onboarding";
import { useUpdateAccount } from "@/services/hooks/mutations/useAccount";
import { Button, ComboBox, InputField, PhoneInput } from "@/components/core";
import { useGetCitiesByStateAndCountry, useGetCountries, useGetStatesByCountry } from "@/services/hooks/queries";

export const OrganizationInformation: React.FC = () => {
    const { mutate, isPending } = useUpdateAccount("Organization information added successfully")
    const [query, setQuery] = useState({
        country: "",
        state: "",
        city: ""
    })
    
    const { errors, handleSubmit, isValid, register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: "",
            phone_number: "",
            website: "",
            country: "",
            state: "",
            city: "",
            address: "",
            zip_code: ""
        },
        validationSchema: onboardOrganizationInfoSchema,
        onSubmit: () => {
            const { name, phone_number, website } = values
            const address_data = {
                country: values.country,
                country_code: selectedCountry?.phonecode,
                state: values.state,
                city: values.city,
                address: values.address,
                zip_code: values.zip_code
            }
            mutate({ address_data, name, phone_number: formatPhoneNumber(phone_number).split(" ").join(""), website, phone_prefix: selectedCountry?.phonecode })
        },
    })

    const { data: countries, isFetching: fetchingCountries } = useGetCountries()
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

    return (
        <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Organization’s Information</h2>
                <p className="text-base text-gray-400">Provide basic information about your organization.</p>
            </div>
            <hr />
            <InputField label="Organization’s Name" placeholder="Organisation name" size="40" type="text" {...register("name")} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhoneInput label="Telephone Number" placeholder="(555) 000-0000" size="40" value={values.phone_number} onChange={(v) => setFieldValue("phone_number", v, true)} error={errors.phone_number} required />
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
                    disabled={fetchingStates}
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
                    displayValue={(item) => item?.name}
                    optionLabel={(option) => option?.name} 
                    setSelected={(value) => setFieldValue("state", value?.name)}
                    placeholder="Select state"
                    size="40"
                    required
                />
                <ComboBox
                    label="City"
                    disabled={fetchingCities}
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
            <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid} block>Save and continue</Button>
        </motion.form>
    )
}