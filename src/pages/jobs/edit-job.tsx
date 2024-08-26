import React, { Fragment, useMemo } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { createJobSchema } from "@/validations/job"
import { capitalizeWords } from "@/utils/capitalize"
import { useNavigate, useParams } from "react-router-dom"
import { useUpdateJob } from "@/services/hooks/mutations"
import { pageVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Button, InputField, SelectInput, TextArea } from "@/components/core"
import { useGetCitiesByCountry, useGetCountries, useGetJob } from "@/services/hooks/queries"

export const EditJobPage: React.FC = () => {
    const navigate = useNavigate()
    const { id: jobId } = useParams()
    const { data: job } = useGetJob(jobId as string)
    const { mutate: edit, isPending } = useUpdateJob("You have successfully edited a job post.", () => navigate(`/jobs/${jobId}/view`))
    const { handleSubmit, isValid, register, values } = useFormikWrapper({
        initialValues: {
            title: job?.title || "",
            description: job?.description || "",
            year_exp: job?.year_exp || "",
            country: capitalizeWords(job?.country || ""),
            city: capitalizeWords(job?.city || ""),
            requirement: job?.requirement?.join(", ") || "",
            required_travel: job?.required_travel?.toString() || "",
            required_relocation: job?.required_relocation?.toString() || "",
            expected_salary: job?.expected_salary?.toString() || ""
        },
        validationSchema: createJobSchema,
        enableReinitialize: true,
        onSubmit: () => {
            const { requirement, required_travel, year_exp, required_relocation, ...rest } = values
            const new_year_exp = year_exp.toString()
            const new_requirement = requirement.split(", ")
            const new_required_travel = required_travel === "yes" ? "1" : "0"
            const new_required_relocation = required_relocation === "yes" ? "1" : "0"
            edit({ ...rest, requirement: new_requirement, required_travel: new_required_travel, required_relocation: new_required_relocation, year_exp: new_year_exp, jobId: jobId as string })
        },
    })

    const { data: countries, isFetching: fetchingCountries } = useGetCountries()
    const fetchedCountries = useMemo(() => {
        return countries?.map((country) => ({ label: country.name, value: country.name }))
    }, [countries])

    const selectedCountry = useMemo(() => {
        return countries?.filter((item) => item?.name === values?.country)?.at(0)
    },[countries, values?.country])

    const { data: cities, isFetching: fetchingCities } = useGetCitiesByCountry(selectedCountry?.iso2 as string)
    const fetchedCities = useMemo(() => {
        return cities?.map((city) => ({ label: city.name, value: city.name }))?.sort((a,b) => a?.label > b?.label ? 1 : -1)
    }, [cities])

    const booleanOptions = [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" }
    ]

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
            <div className="flex flex-col gap-0 h-dvh overflow-y-scroll">
                <div className="flex items-center gap-2.5 py-5 px-8 border-b border-b-gray-200 bg-white">
                    <Button type="button" theme="neutral" variant="ghost" size="40" onClick={() => navigate(`/jobs/${jobId}/view`)}>
                        <Icon icon="ri:arrow-left-s-line" className="size-5" />
                        Back
                    </Button>
                    <h1 className="text-lg text-gray-900">Edit Job</h1>
                </div>
                <div className="flex-1 flex-col overflow-y-scroll min-h-screen h-dvh px:4 lg:px-8 pt-5 pb-10">
                    <div className="bg-white rounded-2xl p-4 lg:p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[42.563rem] w-full">
                            <h2 className="font-medium text-xl text-gray-900">Edit Job Post</h2>
                            <InputField type="text" label="Job Title" placeholder="Job title" size="40" {...register("title")} required />
                            <TextArea label="Job Description" placeholder="Job description" rows={5} {...register("description")} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <InputField type="number" label="Years of Experience" placeholder="Enter number" className="hide-number-input-arrows" size="40" {...register("year_exp")} required />
                                <SelectInput label="Requires Travel?" options={booleanOptions} {...register("required_travel")} required />
                                <SelectInput label="Requires Relocation?" options={booleanOptions} {...register("required_relocation")} required />
                                <SelectInput label="Country" options={fetchedCountries ?? []} disabled={fetchingCountries} {...register("country")} required />
                                <SelectInput label="City" options={fetchedCities ?? []} disabled={fetchingCities || !values.country} {...register("city")} required />
                                <InputField
                                    type="text"
                                    label="Annual Salary Expectation"
                                    placeholder="Enter number"
                                    size="40"
                                    help={<Fragment><Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" />Won't be shown to candidates</Fragment>}
                                    {...register("expected_salary")}
                                    required
                                />
                            </div>
                            <InputField type="text" label="Requirements" placeholder="Nursing Assistant" size="40" {...register("requirement")} required />
                            <div className="grid md:grid-cols-2">
                                <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !isValid} block>Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}