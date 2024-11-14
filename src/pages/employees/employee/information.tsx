import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import type { FetchedJob } from "@/types/jobs";
import { SingleTalent } from "@/types/applicants";
import emptyState from "@/assets/empty_state.webp";
import { capitalizeWords } from "@/utils/capitalize";
import type { ActiveJobRole } from "@/types/employee";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { useShortlistApplicant } from "@/services/hooks/mutations";
import { Avatar, Button, InputField, RenderIf } from "@/components/core";
import { Dialog, DialogPanel, DialogTitle, Radio, RadioGroup } from "@headlessui/react";
import { useGetCountries, useGetJobs, useGetShortlistedCandidate, useGetTalent } from "@/services/hooks/queries";


export const EmployeeInformationPage: React.FC = () => {
    const { id } = useParams()
    const { data: candidate, isLoading: isLoadingCandidate } = useGetTalent<SingleTalent>("")
    const { data: talent, refetch, isLoading } = useGetShortlistedCandidate<ActiveJobRole>({ talentId: id as string })
    const [toggleModals, setToggleModals] = useState({
        openShortlistCandidate: false,
        openInvitedModal: false,
    })
    const [selected, setSelected] = useState<FetchedJob | null>(null)
    const { data: countries } = useGetCountries()
    const { data: jobs } = useGetJobs<FetchedJob[]>({})
    const [query, setQuery] = useState("")

    const filteredJobs =
    query === ""
      ? jobs?.slice(undefined,5)
      : jobs?.filter((job) => {
          return job.title.toLowerCase().includes(query.toLowerCase())
        })
    
    const country = useMemo(() => {
        return countries?.find((item) => item.name.toLowerCase() === talent?.user_data?.address_data?.country?.toLowerCase())
    }, [countries, talent?.user_data?.address_data?.country])

    const toggleShortlistCandidate = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openShortlistCandidate: !toggleModals.openShortlistCandidate,
      }))
    },[toggleModals.openShortlistCandidate])

    const toggleInvitedModal = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openInvitedModal: !toggleModals.openInvitedModal,
      }))
    },[toggleModals.openInvitedModal])
    const { mutate, isPending } = useShortlistApplicant("Candidate shortlisted successfully!", () => toggleInvitedModal())

    const shortlistCandidate = () => {
        const payload = {
            job_id: selected?.job_id as string,
            user_id: talent?.user_id as string,
            invite_status: "0" as "2" | "1" | "0" | "3" | "4",
        }
        mutate({ ...payload })
    }

    const closeModal = () => {
        toggleShortlistCandidate()
        setQuery("")
        setSelected(null)
    }

    const candidateJobs = useMemo(() => {
        if (candidate === undefined) {
            return []
        }
        return candidate?.job_invited?.map((item) => item?.job_id)
    },[candidate])

    useEffect(() => {
        if (talent === undefined) {
            refetch()
        }
    },[refetch, talent])

    const imageUrl = useMemo(() => {
        return `${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/business/fnviewers/${talent?.user_data?.avatar}`
    },[talent?.user_data?.avatar])
    return (
        <Fragment>
            <RenderIf condition={!isLoading && !isLoadingCandidate}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <div className="bg-primary-25 w-full h-32 rounded-lg"></div>
                        <div className="flex items-center px-8 justify-between -mt-9">
                            <div className="grid">
                                <div className="border-[3px] border-white rounded-full w-fit h-fit">
                                    <Avatar size="80" alt="Burton" image={talent?.user_data?.avatar ? imageUrl : talent?.user_data?.avatar as string} />
                                </div>
                                <div className="grid gap-[3px]">
                                    <h1 className="font-medium text-xl text-gray-900 capitalize line-clamp-1">{talent?.user_data?.first_name} {talent?.user_data?.last_name}</h1>
                                    <p className="text-sm text-gray-400">{talent?.user_data?.specialty_data?.specialty_main} / {talent?.user_data?.specialty_data?.specialty_sub}</p>
                                    <div className="flex items-center gap-1.5">
                                        <span><img src={`https://flagsapi.com/${country?.iso2}/shiny/24.png`} /></span> <span className="text-sm text-gray-600 capitalize line-clamp-1">{talent?.user_data?.address_data?.city}, {talent?.user_data?.address_data?.country}</span>
                                    </div>
                                </div>
                            </div>
                            <Button type="button" theme="primary" variant="filled" size="40" onClick={toggleShortlistCandidate}>Shortlist <span className="sr-only lg:not-sr-only">for another job</span></Button>
                        </div>
                    </div>
                    <div className="flex flex-col border border-gray-200 rounded-xl gap-4 p-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-b-[#E2E4E9]">
                            <Icon icon="ri:graduation-cap-line" className="size-6 text-primary-500" />
                            <h2 className="font-medium text-base text-gray-900">Educational Qualification</h2>
                        </div>
                        <RenderIf condition={!!talent?.education_data}>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    talent?.education_data?.map((education) =>
                                        <div key={education._id} className="flex flex-col gap-2.5">
                                            <div className="grid gap-1.5">
                                                <h3 className="font-medium text-sm text-gray-900">{education?.school_name}</h3>
                                                <p className="text-xs text-gray-900">{education?.degree_name}</p>
                                                <span className="text-xs text-gray-900">{education?.completion_year}</span>
                                            </div>
                                            <div className="grid gap-2.5 py-2">
                                                <h4 className="text-sm text-gray-500">Related coursework or projects</h4>
                                                <p className="text-xs text-gray-900">{education?.description}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </RenderIf>
                        <RenderIf condition={!talent?.education_data}>
                            <div className="flex flex-col items-center gap-2 py-7 max-auto">
                                <img src={emptyState} alt="emptyState" className="size-24" />
                                <div className="grid gap-1 text-center">
                                    <h2 className="font-medium text-base text-gray-900">No Educational Information</h2>
                                    <p className="text-sm text-gray-600">{capitalizeWords(talent?.user_data?.first_name as string ?? "")} has no educational qualification at this moment</p>
                                </div>
                            </div>
                        </RenderIf>
                    </div>
                    <div className="flex flex-col border border-gray-200 rounded-xl gap-4 p-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-b-[#E2E4E9]">
                            <Icon icon="ri:briefcase-4-line" className="size-6 text-warning-500" />
                            <h2 className="font-medium text-base text-gray-900">Job History</h2>
                        </div>
                        <RenderIf condition={!!talent?.workexp_data}>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    talent?.workexp_data?.map((work) =>
                                        <div className="flex flex-col gap-1.5" key={work?._id}>
                                            <h3 className="font-medium text-sm text-gray-900 capitalize">{work?.job_title}</h3>
                                            <p className="text-xs text-gray-900 capitalize">{work?.company}</p>
                                            <span className="text-xs text-gray-500">{format(work?.date_data?.start_date, "MMMM yyyy")} - {work?.date_data?.currently_working ? "Present" : format(work?.date_data?.end_date, "MMMM yyyy")}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </RenderIf>
                        <RenderIf condition={!talent?.education_data}>
                            <div className="flex flex-col items-center gap-2 py-7 max-auto">
                                <img src={emptyState} alt="emptyState" className="size-24" />
                                <div className="grid gap-1 text-center">
                                    <h2 className="font-medium text-base text-gray-900">No Work Experience</h2>
                                    <p className="text-sm text-gray-600">{capitalizeWords(talent?.user_data?.first_name as string ?? "")} has no work experience at this moment</p>
                                </div>
                            </div>
                        </RenderIf>
                    </div>
                    <div className="flex flex-col border border-gray-200 rounded-xl gap-4 p-4">
                        <div className="flex items-center gap-4 pb-4 border-b border-b-[#E2E4E9]">
                            <Icon icon="ri:map-pin-user-line" className="size-6 text-blue-500" />
                            <h2 className="font-medium text-base text-gray-900">Other Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <h3 className="font-medium text-sm text-gray-900 capitalize">Willing to travel?</h3>
                                <p className="text-xs text-gray-900 capitalize">{talent?.user_data?.relocation_data?.ready_to_travel ? "Yes" : "No"}</p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="font-medium text-sm text-gray-900 capitalize">Willing to relocate?</h3>
                                <p className="text-xs text-gray-900 capitalize">{talent?.user_data?.relocation_data?.ready_to_relocate ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div> 
                    <Dialog open={toggleModals.openShortlistCandidate} as="div" className="relative z-10 focus:outline-none" onClose={toggleShortlistCandidate}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                            <div className="flex min-h-full items-end md:items-center justify-center p-4">
                                <DialogPanel transition className="w-full max-w-[24.5rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                                    <div className="flex flex-col gap-1 p-5">
                                        <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                            Select Job
                                        </DialogTitle>
                                        <p className="text-sm text-gray-500">
                                            Invite this shortlisted candidate to participate in an of your posted jobs.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 px-5 pb-5">
                                        <InputField type="text" placeholder="Search job roles" iconRight="ri:search-2-line" onChange={(event) => setQuery((event.target as HTMLInputElement).value)} />
                                        <RenderIf condition={filteredJobs !== undefined && filteredJobs?.length > 0}>
                                            <RadioGroup by={"title" as any} value={selected} onChange={setSelected} aria-label="Job" className="space-y-2.5">
                                                {
                                                    filteredJobs?.map((job) => (
                                                    <Radio
                                                        key={job?.job_id}
                                                        value={job}
                                                        disabled={candidateJobs?.includes(job?.job_id)}
                                                        className={cn("group relative flex items-center justify-between rounded-md border border-gray-200 py-1.5 px-2 transition duration-300 ease-out focus:outline-none data-[focus]:border-primary-500 data-[checked]:border-primary-500 data-[checked]:text-gray-900 data-[checked]:bg-primary-25", (candidateJobs?.includes(job?.job_id)) ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-gray-600")}
                                                    >
                                                        {job?.title}
                                                        <RenderIf condition={candidateJobs?.includes(job?.job_id)}>
                                                            <span className="text-xs rounded-full bg-primary-100 text-primary-600 py-0.5 px-1">Shortlisted</span> 
                                                        </RenderIf>
                                                    </Radio>
                                                    ))
                                                }
                                            </RadioGroup>
                                        </RenderIf>
                                        <RenderIf condition={filteredJobs == undefined || filteredJobs?.length === 0}>
                                            <div className="flex items-center text-center text-gray-500 text-sm justify-center py-2">No jobs found.</div>
                                        </RenderIf>
                                    </div>
                                    <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                        <Button type="button" theme="neutral" variant="stroke" size="40" disabled={isPending} onClick={() => closeModal()} block>Dismiss</Button>
                                        <Button type="button" theme="primary" variant="filled" size="40" disabled={isPending || !selected?.job_id} onClick={shortlistCandidate} block>Yes, Send Invitation</Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog open={toggleModals.openInvitedModal} as="div" className="relative z-10 focus:outline-none" onClose={toggleInvitedModal}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                            <div className="flex min-h-full items-end md:items-center justify-center p-4">
                                <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                                    <div className="flex flex-col items-center gap-4 p-5">
                                        <div className="grid place-content-center bg-success-50 rounded-[0.625rem] p-2">
                                            <Icon icon="ri:checkbox-circle-fill" className="text-success-500 size-6" />
                                        </div>
                                        <div className="grid gap-1 text-center">
                                            <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                                Job Invitation Sent
                                            </DialogTitle>
                                            <p className="text-sm text-gray-500">
                                                You have successfully sent job invitations. Wait for response.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                        <Button type="button" theme="neutral" variant="stroke" size="36" block onClick={() => {
                                            toggleInvitedModal()
                                            closeModal()
                                        }}>Dismiss</Button>
                                        <Button type="button" theme="primary" variant="filled" size="36" block onClick={() => {
                                            toggleInvitedModal()
                                            closeModal()
                                        }}>Done</Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isLoading || isLoadingCandidate}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}