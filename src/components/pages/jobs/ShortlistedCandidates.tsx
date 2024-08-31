import React, { Fragment, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { Avatar, Button, InputField, ProgressBar, RenderIf, Table } from "@/components/core";
import { useGetShortlisted } from "@/services/hooks/queries";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";
import type { FetchedShortlistedCandidate, FetchedTalentCount } from "@/types/applicants";
import { DeleteShortlist } from "./DeleteShortlist";


export const ShortlistedCandidates: React.FC = () => {
    const { id } = useParams()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { data: candidates, isFetching } = useGetShortlisted<FetchedShortlistedCandidate[]>({ invite_status: "0", job_id: id as string })
    const { data: count, isFetching: fetchingCount } = useGetShortlisted<FetchedTalentCount>({ component: "count", invite_status: "0", job_id: id as string })
    const [searchParams, setSearchParams] = useSearchParams();
    const [toggleModals, setToggleModals] = useState({
        openShortlistCandidate: false,
    })
    const [activeTalent, setActiveTalent] = useState<FetchedShortlistedCandidate | null>(null)
    const toggleShortlistCandidate = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openShortlistCandidate: !toggleModals.openShortlistCandidate,
      }))
    },[toggleModals.openShortlistCandidate])

    const columns = [
        {
            header: () => "Name",
            accessorKey: "user_data[0].first_name",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <div className="flex items-center gap-3">
                        <Avatar size="40" image="" alt={`${item?.user_data?.at(0)?.first_name}_${item?.user_data?.at(0)?.last_name}`} />
                        <div className="whitespace-nowrap">{item?.user_data?.at(0)?.first_name} {item?.user_data?.at(0)?.last_name}</div>
                    </div>
                )
            }
        },
        {
            header: () => "Specialty",
            accessorKey: "user_data[0].specialty_data.title",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <div className="whitespace-nowrap">{item?.user_data?.at(0)?.specialty_data?.title}</div>
                )
            }
        },
        {
            header: () => "Note",
            accessorKey: "note",
        },
        {
            header: () => "Qualification",
            accessorKey: "qualification",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <ProgressBar value={25 * item?.priority} />
                )
            }
        },
        {
            header: () => "Priority",
            accessorKey: "priority",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <Fragment>
                        <RenderIf condition={item?.priority === 0}>
                            <div className="flex items-center justify-center w-fit py-0.5 px-2 font-medium text-xs rounded-full bg-blue-50 text-blue-500">Low</div>
                        </RenderIf>
                        <RenderIf condition={item?.priority === 1}>
                            <div className="flex items-center justify-center w-fit py-0.5 px-2 font-medium text-xs rounded-full bg-primary-50 text-primary-500">Medium</div>
                        </RenderIf>
                        <RenderIf condition={item?.priority === 2}>
                            <div className="flex items-center justify-center w-fit py-0.5 px-2 font-medium text-xs rounded-full bg-warning-50 text-warning-600">High</div>
                        </RenderIf>
                    </Fragment>
                )
            }
        },
        {
            header: () => "Status",// 0=shortlisted, 1=accepted, 2=rejected, 3=invited, 4=interview sent
            accessorKey: "invite_status",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <Fragment>
                        <RenderIf condition={item?.invite_status === 0}>
                            <div className="font-medium text-xs text-warning-600">Shortlisted</div>
                        </RenderIf>
                        <RenderIf condition={item?.invite_status === 1}>
                            <div className="font-medium text-xs text-blue-500">Accepted</div>
                        </RenderIf>
                        <RenderIf condition={item?.invite_status === 2}>
                            <div className="font-medium text-xs text-error-600">Rejected</div>
                        </RenderIf>
                        <RenderIf condition={item?.invite_status === 3}>
                            <div className="font-medium text-xs text-success-500">Invited</div>
                        </RenderIf>
                    </Fragment>
                )
            }
        },
        {
            header: () => "Action",
            accessorKey: "action",
            enableSorting: false,
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedShortlistedCandidate
                return (
                    <Button
                        size="32"
                        type="button"
                        theme="neutral"
                        variant="ghost"
                        onClick={() => {
                            setActiveTalent(item)
                            toggleShortlistCandidate();
                        }}>
                        <Icon icon="ri:delete-bin-line" className="size-5" />
                    </Button>
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
        <Fragment>
            <RenderIf condition={!isFetching && !fetchingCount}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-900 text-base">Shortlisted</h2>
                        <div className="flex items-center gap-5 flex-1 max-w-96">
                            <InputField type="text" placeholder="Search talents" iconRight="ri:search-2-line" />
                            <Button theme="neutral" variant="stroke" size="36">
                                <Icon icon="ri:filter-3-line" className="size-5" />
                            </Button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        data={candidates ?? []}
                        page={page}
                        perPage={itemsPerPage}
                        totalCount={count?.total}
                        onPageChange={handlePageChange}
                        emptyStateText="No items to be found here."
                    />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching || fetchingCount}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
            <DeleteShortlist isOpen={toggleModals.openShortlistCandidate} onClose={toggleShortlistCandidate} talent={activeTalent!} />
        </Fragment>
    )
}