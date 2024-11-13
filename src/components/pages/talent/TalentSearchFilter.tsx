import React, { useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Button, CheckBox, ComboBox, InputField } from "@/components/core"
import { CloseButton, Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { useGetCountries, useGetStatesByCountry } from "@/services/hooks/queries"

interface TalentSearchFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFilters: (v: Record<string, any>) => void;
    filters: Record<string, any>
}

export const TalentSearchFilter: React.FC<TalentSearchFilterProps> = ({ setFilters, filters }) => {
    const [query, setQuery] = useState({
        country: "",
        state: "",
        city: ""
    })

    const { dirty, register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            country: filters?.country || "",
            state: filters?.state || "",
            city: filters?.city || "",
            year_exp: filters?.year_exp || "",
            skills: filters?.skills || "",
            salary: filters?.salary || "",
            travel: filters?.travel || "",
            relocate: filters?.relocate || ""
        },
        enableReinitialize: true,
        onSubmit: () => {}
    })

    const { data: countries, isLoading: fetchingCountries } = useGetCountries()
    const fetchedCountries = query.country === ""
        ? countries
        : countries?.filter((country) => {
            return country.name.toLowerCase().includes(query.country.toLowerCase())
            })

    const selectedCountry = useMemo(() => {
        return countries?.filter((item) => item?.name === values?.country)?.at(0)
    },[countries, values?.country])

    const { data: states, isLoading: fetchingStates } = useGetStatesByCountry(selectedCountry?.iso2 as string)
    const fetchedStates = query.state === ""
        ? states?.states
        : states?.states?.filter((state) => {
            return state.name.toLowerCase().includes(query.state.toLowerCase())
            })
    
    const availability = [
        { label: "Willing to Travel", value: "travel" },
        { label: "Willing to Relocate", value: "relocate" }
    ]

    const applyFilter = () => {
        const { travel, relocate, ...rest } = values
        setFilters({ ...rest, ...(travel ? { travel } : {}), ...(relocate ? { relocate } : {}) })
    }
    return (
        <Popover className="relative">
            <PopoverButton as={Button} type="button" theme="neutral" variant="stroke" size="40">
                <Icon icon="ri:filter-3-line" className="size-5" />
            </PopoverButton>
            <PopoverPanel anchor="bottom end" transition className="z-10 max-w-96 shadow-lg origin-top-right rounded-lg bg-white px-3 py-4 transition duration-300 ease-out focus:outline-none data-[closed]:scale-75 data-[closed]:opacity-0">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[#868C98] font-medium text-sm uppercase py-1 px-2">Filter by</h2>
                    <div className="grid gap-4">
                        <ComboBox
                            disabled={fetchingCountries}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                country: "",
                            }))}
                            options={fetchedCountries ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                country: value,
                            }))} 
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("country", value?.name)}
                            placeholder="Country"
                            label="Country"
                        />
                        <ComboBox
                            disabled={fetchingStates}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                state: "",
                            }))}
                            options={fetchedStates ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                state: value,
                            }))} 
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("state", value?.name)}
                            placeholder="State"
                            label="State"
                        />
                        <InputField type="text" label="City" placeholder="City" {...register("city")} />
                        <InputField type="text" label="Skills" placeholder="Skills" {...register("skills")} />
                        <InputField type="text" label="Years of experience" placeholder="Years of experience" {...register("year_exp")} />
                        <InputField type="text" label="Salary expectation" placeholder="Salary expectation" {...register("salary")} />
                    </div>
                    <div className="grid gap-2">
                        <div className="text-[#868C98] font-medium text-sm uppercase py-1 px-2">Availability</div>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                availability.map((filter) =>
                                <div key={filter.value} className="flex items-center gap-2 text-gray-900 text-sm">
                                    <CheckBox 
                                        label={filter.label}
                                        checked={values[filter?.value as keyof typeof values]}
                                        onChange={() => setFieldValue(filter?.value, !values[filter?.value as keyof typeof values], true)}
                                    />
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <CloseButton as={Button} type="button" theme="neutral" variant="lighter" size="32" block>Cancel</CloseButton>
                        <Button type="button" theme="primary" variant="filled" size="32" disabled={!dirty} onClick={() => applyFilter()} block>Apply</Button>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}