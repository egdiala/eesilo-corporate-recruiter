import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { useGetShortlisted } from "@/services/hooks/queries";
import type { FetchedJobCount, HiredCandidate } from "@/types/jobs";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Avatar, Button, InputField, ProgressBar, RenderIf, Table } from "@/components/core";
import { useDebounce } from "@/hooks/useDebounce";


export const Hired: React.FC = () => {
    const { id: jobId } = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { value, onChangeHandler } = useDebounce(500)
    const { data: candidates, isFetching } = useGetShortlisted<HiredCandidate[]>({ offer_status: "1", job_id: jobId, page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })
    const { data: count, isFetching: fetchingCount } = useGetShortlisted<FetchedJobCount>({ component: "count", offer_status: "1", job_id: jobId, q: value })
    const [searchParams, setSearchParams] = useSearchParams();

    const imageUrl = `${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/user/fnviewers/`

    const columns = [
        {
            header: () => "Name",
            accessorKey: "name",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as HiredCandidate
                return (
                    <div className="flex items-center gap-3">
                        <Avatar size="40" image={item?.user_data?.avatar ? `${imageUrl}${item?.user_data?.avatar}` : item?.user_data?.avatar} alt={`${item?.user_data?.first_name}_${item?.user_data?.last_name}`} />
                        <div className="whitespace-nowrap capitalize">{item?.user_data?.first_name} {item?.user_data?.last_name}</div>
                    </div>
                )
            }
        },
        {
            header: () => "Date Accepted",
            accessorKey: "timestamp_data.offer_made_at",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as HiredCandidate
                return (
                    <div className="whitespace-nowrap capitalize">{format(item?.timestamp_data?.offer_made_at, "dd MMM. yyyy")}</div>
                )
            }
        },
        {
            header: () => "Active Days",
            accessorKey: "note",
        },
        {
            header: () => "Qualification",
            accessorKey: "qualification",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as HiredCandidate
                return (
                    <ProgressBar value={10 * item?.match_count} />
                )
            }
        }
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
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
            <div className="grid w-full gap-5 lg:gap-0 lg:flex lg:items-center lg:justify-between">
                <h2 className="font-medium text-gray-900 text-base">Active Employees</h2>
                <div className="flex items-center gap-5 flex-1 lg:max-w-96">
                    <InputField type="text" placeholder="Search employees" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                    <Button theme="neutral" variant="stroke" size="36">
                        <Icon icon="ri:filter-3-line" className="size-5" />
                    </Button>
                </div>
            </div>
            <RenderIf condition={!isFetching && !fetchingCount}>
                <Table
                    columns={columns}
                    data={candidates ?? []}
                    page={page}
                    perPage={itemsPerPage}
                    totalCount={count?.total}
                    onPageChange={handlePageChange}
                    emptyStateText="No employees were found here."
                    onClick={({ original }) => navigate(`/employees/view/${original?.user_id}/information`)}
                />
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </motion.div>
    )
}