import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { formatPhoneNumber } from "react-phone-number-input";
import { onboardOrganizationInfoSchema } from "@/validations/onboarding";
import { useUpdateAccount } from "@/services/hooks/mutations/useAccount";
import { Button, InputField, PhoneInput, SelectInput } from "@/components/core";
import { useGetCitiesByStateAndCountry, useGetCountries, useGetStatesByCountry } from "@/services/hooks/queries";

export const OrganizationInformation: React.FC = () => {
    const { mutate, isPending } = useUpdateAccount("Organization information added successfully")
    
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
    const fetchedCountries = useMemo(() => {
        return countries?.map((country) => ({ label: country.name, value: country.name }))
    }, [countries])

    const selectedCountry = useMemo(() => {
        return countries?.filter((item) => item?.name === values?.country)?.at(0)
    },[countries, values?.country])

    const { data: states, isFetching: fetchingStates } = useGetStatesByCountry(selectedCountry?.iso2 as string)
    const fetchedStates = useMemo(() => {
        return states?.map((state) => ({ label: state.name, value: state.name }))?.sort((a,b) => a?.label > b?.label ? 1 : -1)
    }, [states])

    const selectedState = useMemo(() => {
        return states?.filter((item) => item?.name === values?.state)?.at(0)
    },[states, values?.state])

    const { data: cities, isFetching: fetchingCities } = useGetCitiesByStateAndCountry({ country: selectedCountry?.iso2 as string, state: selectedState?.iso2 as string })
    const fetchedCities = useMemo(() => {
        return cities?.map((city) => ({ label: city.name, value: city.name }))?.sort((a,b) => a?.label > b?.label ? 1 : -1)
    }, [cities])

    return (
        <motion.form onSubmit={handleSubmit} initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <h2 className="font-medium text-lg text-gray-900">Organization’s Information</h2>
                <p className="text-base text-gray-400">Provide basic information about your organization.</p>
            </div>
            <hr />
            <InputField label="Organization’s Name" placeholder="Organisation name" size="40" type="text" {...register("name")} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhoneInput label="Telephone Number" placeholder="(555) 000-0000" size="40" value={values.phone_number} onChange={(v) => setFieldValue("phone_number", v, true)} error={errors.phone_number} countryCallingCodeEditable={true} required />
                <SelectInput label="Country" placeholder="Country" size="40" options={fetchedCountries ?? []} disabled={fetchingCountries} {...register("country")} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput label="State" placeholder="Select state" size="40" options={fetchedStates ?? []} disabled={fetchingStates || !values.country} {...register("state")} required />
                <SelectInput label="City" placeholder="Select city" size="40" options={fetchedCities ?? []} disabled={fetchingCities || !values.state} {...register("city")} required />
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