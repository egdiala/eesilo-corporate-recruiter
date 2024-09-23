import React, { useMemo, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useDebounce } from "@/hooks/useDebounce"
import { TalentCard } from "@/components/pages/talent"
import { Loader } from "@/components/core/Button/Loader"
import { useGetCitiesByStateAndCountry, useGetCountries, useGetJobs, useGetShortlisted, useGetStatesByCountry } from "@/services/hooks/queries"
import { pageVariants, routeVariants } from "@/constants/animateVariants"
import type { FetchedTalent } from "@/types/applicants"
import { Button, CheckBox, ComboBox, EmptyState, InputField, RenderIf } from "@/components/core"
import { Link } from "react-router-dom"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection } from "@headlessui/react"
import { FetchedJob } from "@/types/jobs"

export const EmployeesPage: React.FC = () => {
    const [query, setQuery] = useState({
        job: "",
        country: "",
        state: "",
        city: ""
    })
    const { data: jobs, isFetching: fetchingJobs } = useGetJobs<FetchedJob[]>({})
    const { onChangeHandler } = useDebounce(500)
    const { onChangeHandler: handleYearExp } = useDebounce(500)

    const { values, setFieldValue } = useFormikWrapper({
        initialValues: {
            job_id: "",
            country: "",
            state: "",
            city: "",
            // year_exp: ""
        },
        onSubmit: () => {}
    })

    const { data: candidates, isFetching } = useGetShortlisted<FetchedTalent[]>({ offer_status: "1", ...values })
    // const { data: count, isFetching: fetchingCount } = useGetTalents<FetchedTalentCount>({ component: "count", keyword, year_exp })

    const fetchedJobs = query.job === ""
        ? jobs
        : jobs?.filter((job) => {
            return job.title.toLowerCase().includes(query.job.toLowerCase())
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
const filters = ["Willing to Travel", "Willing to Relocate"]
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10 view-page-container overflow-scroll">
            <div className="bg-white rounded-2xl lg:p-8">
                <div className="flex flex-col gap-5 border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <h2 className="font-medium text-base text-gray-900">All your hired employees</h2>
                        <div className="flex items-center justify-end gap-5 flex-1">
                            <div className="flex-1 lg:max-w-80">
                                <InputField placeholder="Input Keyword" type="text" size="40" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                            </div>
                            <Button type="button" theme="primary" variant="filled" size="40">
                                <Icon icon="ri:search-2-line" className="size-5" />
                                Search
                            </Button>
                            <Menu>
                                <MenuButton as={Button} type="button" theme="neutral" variant="stroke" size="40">
                                    <Icon icon="ri:filter-3-line" className="size-5" />
                                </MenuButton>
                                <MenuItems as="div" transition className="w-48 shadow-lg origin-top-right rounded-lg bg-white px-3 py-4 transition duration-300 ease-out focus:outline-none data-[closed]:scale-75 data-[closed]:opacity-0" anchor="bottom end">
                                    <MenuSection as="div" className="grid gap-2">
                                        <MenuHeading className="text-[#868C98] font-medium text-xs uppercase py-1 px-2">Availability</MenuHeading>
                                        <div className="grid gap-2">
                                            {
                                                filters.map((filter) =>
                                                <MenuItem key={filter} as="div" className="flex items-center gap-2 text-gray-900 text-sm">
                                                    <CheckBox label={filter} />
                                                </MenuItem>
                                                )
                                            }
                                        </div>
                                    </MenuSection>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                        <ComboBox
                            disabled={fetchingJobs}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                job: "",
                            }))}
                            options={fetchedJobs ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                job: value
                            }))} 
                            displayValue={(item) => item?.title}
                            optionLabel={(option) => option?.title} 
                            setSelected={(value) => setFieldValue("job_id", value?.job_id)}
                            placeholder="Job Role"
                        />
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
                        />
                        <ComboBox
                            disabled={fetchingCities}
                            onClose={() => setQuery((prev) => ({
                                ...prev,
                                city: "",
                            }))}
                            options={fetchedCities ?? []} 
                            onChange={(value) => setQuery((prev) => ({
                                ...prev,
                                city: value,
                            }))} 
                            displayValue={(item) => item?.name}
                            optionLabel={(option) => option?.name} 
                            setSelected={(value) => setFieldValue("city", value?.name)}
                            placeholder="City"
                        />
                        <InputField type="text" placeholder="Educational qualifications" />
                        <InputField type="text" placeholder="Skills" />
                        <InputField type="text" placeholder="Years of experience" onChange={handleYearExp} />
                        <InputField type="text" placeholder="Salary expectation" />
                    </div>
                    <RenderIf condition={!isFetching}>
                        <RenderIf condition={candidates?.length! > 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid grid-cols-3 gap-5">
                                {
                                    candidates?.map((item) =>
                                        <TalentCard key={item?.user_id} talent={item!} as={Link} to={`/talent/${item?.user_id}/view`} />
                                    )
                                }
                            </motion.div>
                        </RenderIf>
                        <RenderIf condition={candidates?.length! === 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="flex items-center justify-center">
                                <EmptyState emptyStateTitle="No employee found" emptyStateText="You are yet to hire a talent." />
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