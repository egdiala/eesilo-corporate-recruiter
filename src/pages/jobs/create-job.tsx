import React, { Fragment, useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { createJobSchema } from "@/validations/job"
import { useCreateJob } from "@/services/hooks/mutations"
import { pageVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Button, ComboBox, InputField, SelectInput, TextArea } from "@/components/core"
import { useGetCitiesByStateAndCountry, useGetCountries, useGetStatesByCountry } from "@/services/hooks/queries"

export const CreateJobPage: React.FC = () => {
    const navigate = useNavigate()
    const { mutate: create, isPending } = useCreateJob("You have successfully created a job post.", () => navigate("/jobs"))
    const [query, setQuery] = useState({
        country: "",
        state: "",
        city: ""
    })
    const { handleSubmit, isValid, errors, register, values, setFieldValue, handleBlur } = useFormikWrapper({
        initialValues: {
            title: "",
            description: "",
            year_exp: "",
            country: "",
            state: "",
            city: "",
            requirement: "",
            required_travel: "",
            required_relocation: "",
            expected_salary: ""
        },
        validationSchema: createJobSchema,
        onSubmit: () => {
            const { requirement, required_travel, year_exp, required_relocation, ...rest } = values
            const new_year_exp = year_exp.toString()
            const new_requirement = requirement.split(", ")
            const new_required_travel = required_travel === "yes" ? "1" : "0"
            const new_required_relocation = required_relocation === "yes" ? "1" : "0"
            create({ ...rest, requirement: new_requirement, required_travel: new_required_travel, required_relocation: new_required_relocation, year_exp: new_year_exp })
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

    const { data: cities, isFetching: fetchingCities } = useGetCitiesByStateAndCountry({ state: selectedState?.iso2 as string, country: selectedCountry?.iso2 as string })
    const fetchedCities = query.city === ""
        ? cities
        : cities?.filter((city) => {
            return city.name.toLowerCase().includes(query.city.toLowerCase())
            })

    const booleanOptions = [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" }
    ]

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
            <div className="flex flex-col gap-0 view-page-container overflow-hidden">
                <div className="flex items-center gap-2.5 py-5 px-8 border-b border-b-gray-200 bg-white">
                    <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate("/jobs")}>
                        <Icon icon="ri:arrow-left-s-line" className="size-5" />
                        Back
                    </Button>
                    <h1 className="text-lg text-gray-900">Create New Job Posting</h1>
                </div>
                <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px:4 lg:px-8 pt-5 pb-10">
                    <div className="bg-white rounded-2xl p-4 lg:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[42.563rem] w-full">
                            <h2 className="font-medium text-xl text-gray-900">Create Job Post</h2>
                            <InputField type="text" label="Job Title" placeholder="Job title" size="40" {...register("title")} required />
                            <TextArea label="Job Description" placeholder="Job description" rows={5} {...register("description")} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <InputField type="number" label="Years of Experience" placeholder="Enter number" className="hide-number-input-arrows" size="40" {...register("year_exp")} required />
                                <SelectInput label="Requires Travel?" options={booleanOptions} {...register("required_travel")} required />
                                <SelectInput label="Requires Relocation?" options={booleanOptions} {...register("required_relocation")} required />
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
                                    onBlur={handleBlur}
                                    displayValue={(item) => item?.name}
                                    optionLabel={(option) => option?.name} 
                                    setSelected={(value) => setFieldValue("country", value?.name, true)}
                                    placeholder="Country"
                                    size="40"
                                    required
                                />
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
                                    onBlur={handleBlur}
                                    displayValue={(item) => item?.name}
                                    optionLabel={(option) => option?.name} 
                                    setSelected={(value) => setFieldValue("state", value?.name, true)}
                                    placeholder="Select state"
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
                                    onBlur={handleBlur}
                                    displayValue={(item) => item?.name}
                                    optionLabel={(option) => option?.name} 
                                    setSelected={(value) => setFieldValue("city", value?.name, true)}
                                    placeholder="Select city"
                                    size="40"
                                    required
                                />
                                <InputField
                                    type="text"
                                    label="Annual Salary Expectation ($)"
                                    placeholder="Enter number"
                                    size="40"
                                    help={<Fragment><Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" />Won't be shown to candidates</Fragment>}
                                    {...register("expected_salary")}
                                    required
                                />
                                <div className="col-span-2">
                                    <InputField
                                        type="text"
                                        label="Requirements"
                                        placeholder="Nursing Assistant"
                                        size="40"
                                        help={<Fragment><Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" />Comma separated values eg Dentist, Optician, Nurse</Fragment>}
                                        {...register("requirement")}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2">
                                <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid} block>Post Job</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}