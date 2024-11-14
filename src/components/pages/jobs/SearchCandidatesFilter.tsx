import React from "react"
import { Icon } from "@iconify/react"
import { Button, InputField } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { CloseButton, Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

interface SearchCandidatesFilterProps {
    // eslint-disable-next-line no-unused-vars
    setFilters: (v: Record<string, any>) => void;
    filters: Record<string, any>
}

export const SearchCandidatesFilter: React.FC<SearchCandidatesFilterProps> = ({ setFilters, filters }) => {

    const { dirty, register, values } = useFormikWrapper({
        initialValues: {
            education: filters?.education || "",
            year_exp: filters?.year_exp || "",
            skills: filters?.skills || "",
            salary: filters?.salary || "",
        },
        enableReinitialize: true,
        onSubmit: () => {}
    })

    const applyFilter = () => {
        setFilters(values)
    }
    return (
        <Popover className="relative">
            <PopoverButton as={Button} type="button" theme="neutral" variant="stroke" size="36">
                <Icon icon="ri:filter-3-line" className="size-5" />
            </PopoverButton>
            <PopoverPanel anchor="bottom end" transition className="z-10 w-96 shadow-lg origin-top-right rounded-lg bg-white px-3 py-4 transition duration-300 ease-out focus:outline-none data-[closed]:scale-75 data-[closed]:opacity-0">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[#868C98] font-medium text-sm uppercase py-1 px-2">Filter by</h2>
                    <div className="grid gap-4">
                        <InputField type="text" label="Educational Qualifications" placeholder="Educational Qualifications" {...register("education")} />
                        <InputField type="text" label="Skills" placeholder="Skills" {...register("skills")} />
                        <InputField type="text" label="Years of experience" placeholder="Years of experience" {...register("year_exp")} />
                        <InputField type="text" label="Salary expectation" placeholder="Salary expectation" {...register("salary")} />
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