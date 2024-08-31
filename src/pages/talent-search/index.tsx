import React, { useMemo } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useDebounce } from "@/hooks/useDebounce"
import { TalentCard } from "@/components/pages/talent"
import { Loader } from "@/components/core/Button/Loader"
import { useGetCitiesByCountry, useGetCountries, useGetJobs, useGetTalents } from "@/services/hooks/queries"
import { pageVariants, routeVariants } from "@/constants/animateVariants"
import type { FetchedTalent } from "@/types/applicants"
import { Button, EmptyState, InputField, RenderIf, SelectInput } from "@/components/core"
import { Link } from "react-router-dom"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"

export const TalentSearchPage: React.FC = () => {
    const { data: jobs, isFetching: fetchingJobs } = useGetJobs()
    const { value: keyword, onChangeHandler } = useDebounce(500)
    const { value: year_exp, onChangeHandler: handleYearExp } = useDebounce(500)

    const { register, values } = useFormikWrapper({
        initialValues: {
            job_id: "",
            country: "",
            city: "",
            // year_exp: ""
        },
        onSubmit: () => {}
    })

    const { data: candidates, isFetching } = useGetTalents<FetchedTalent[]>({ keyword, year_exp, ...values })
    // const { data: count, isFetching: fetchingCount } = useGetTalents<FetchedTalentCount>({ component: "count", keyword, year_exp })

    const fetchedJobs = useMemo(() => {
        return jobs?.map((job) => ({ label: job?.title, value: job?.job_id }))
    },[jobs])

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

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10 view-page-container">
            <div className="bg-white rounded-2xl lg:p-8">
                <div className="flex flex-col gap-5 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-base text-gray-900">Find your next employee</h2>
                        <div className="flex items-center justify-end gap-5 flex-1">
                            <div className="flex-1 max-w-80">
                                <InputField placeholder="Input Keyword" type="text" size="40" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                            </div>
                            <Button type="button" theme="primary" variant="filled" size="40">
                                <Icon icon="ri:search-2-line" className="size-5" />
                                Search
                            </Button>
                            <Button type="button" theme="neutral" variant="stroke" size="40">
                                <Icon icon="ri:filter-3-line" className="size-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <SelectInput label="Job Role" options={fetchedJobs ?? []} disabled={fetchingJobs} {...register("job_id")} />
                        <SelectInput label="Country" options={fetchedCountries ?? []} disabled={fetchingCountries} {...register("country")} />
                        <SelectInput label="City" options={fetchedCities ?? []} disabled={fetchingCities || !selectedCountry?.id} {...register("city")} />
                        <InputField type="text" label="Educational qualifications" />
                        <InputField type="text" label="Skills" />
                        <InputField type="text" label="Years of experience" onChange={handleYearExp} />
                        <InputField type="text" label="Salary expectation" />
                    </div>
                    <RenderIf condition={!isFetching}>
                        <RenderIf condition={candidates?.length! > 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid grid-cols-3 gap-5">
                                {
                                    candidates?.map((item) =>
                                        <TalentCard key={item?.user_id} talent={item!} as={Link} to={`/employees/${item?.user_id}/view`} />
                                    )
                                }
                            </motion.div>
                        </RenderIf>
                        <RenderIf condition={candidates?.length! === 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="flex items-center justify-center">
                                <EmptyState emptyStateText="No talent found here." />
                            </motion.div>
                        </RenderIf>
                    </RenderIf>
                    <RenderIf condition={isFetching}>
                        <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                    </RenderIf>
                </div>
            </div>
        </motion.div>
    )
}