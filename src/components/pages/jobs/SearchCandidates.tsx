import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { Avatar, Button, InputField, RenderIf, Table } from "@/components/core";
import { useGetTalents } from "@/services/hooks/queries";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedTalent, FetchedTalentCount } from "@/types/applicants";
import { useDebounce } from "@/hooks/useDebounce";


export const SearchCandidates: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { value: keyword, onChangeHandler } = useDebounce(500)
    const { value: year_exp, onChangeHandler: handleYearExp } = useDebounce(500)
    const { data: candidates, isFetching } = useGetTalents<FetchedTalent[]>({ keyword, year_exp })
    const { data: count, isFetching: fetchingCount } = useGetTalents<FetchedTalentCount>({ component: "count", keyword, year_exp })
    const [searchParams, setSearchParams] = useSearchParams();

    const columns = [
        {
            header: () => "Name",
            accessorKey: "first_name",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTalent
                return (
                    <div className="flex items-center gap-3">
                        <Avatar size="40" image={""} alt={`${item?.first_name}_${item?.last_name}`} />
                        <div className="whitespace-nowrap">{item?.first_name} {item?.last_name}</div>
                    </div>
                )
            }
        },
        {
            header: () => "Specialty",
            accessorKey: "specialty_data.title",
        },
        {
            header: () => "Sub-Specialty",
            accessorKey: "specialty_data.specialty_sub",
            enableSorting: false
        },
        {
            header: () => "Qualification",
            accessorKey: "qualification",
        },
        {
            header: () => "Action",
            accessorKey: "status",
            enableSorting: false,
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedTalent
                return (
                    <button type="button" className="font-normal text-xs text-warning-600 whitespace-nowrap" onClick={() => {item?.user_id}}>Add to Shortlist</button>
                )
            }
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location, setPage])

    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-900 text-base">Invite New Candidates</h2>
                <div className="flex items-center gap-5 flex-1 max-w-96">
                    <InputField type="text" placeholder="Search talents" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                    <Button theme="neutral" variant="stroke" size="36">
                        <Icon icon="ri:filter-3-line" className="size-5" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <InputField type="text" placeholder="Job Role" />
                <InputField type="text" placeholder="Educational qualifications" />
                <InputField type="text" placeholder="Skills" />
                <InputField type="text" placeholder="Years of experience" onChange={handleYearExp} />
                <InputField type="text" placeholder="Salary expectation" />
            </div>
            <RenderIf condition={!isFetching && !fetchingCount}>
                <Table
                    columns={columns}
                    data={candidates ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={count?.total}
                    onPageChange={handlePageChange}
                    emptyStateText="No candidates to be found here."
                    onClick={({ original }) => navigate(`/jobs/${original?.job_id}/view`)}
                />
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </motion.div>
    )
}