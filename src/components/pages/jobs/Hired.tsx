import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { Button, InputField, RenderIf, Table } from "@/components/core";
import { useGetShortlisted } from "@/services/hooks/queries";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";


export const Hired: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { data: candidates, isFetching } = useGetShortlisted<any[]>({ offer_status: "1" })
    const [searchParams, setSearchParams] = useSearchParams();

    const columns = [
        {
            header: () => "Name",
            accessorKey: "name",
        },
        {
            header: () => "Specialty",
            accessorKey: "specialty",
        },
        {
            header: () => "Note",
            accessorKey: "note",
        },
        {
            header: () => "Qualification",
            accessorKey: "qualification",
        },
        {
            header: () => "Priority",
            accessorKey: "total_pending",
        },
        {
            header: () => "Status",
            accessorKey: "status",
        },
        {
            header: () => "Action",
            accessorKey: "status",
            enableSorting: false
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
            <RenderIf condition={!isFetching}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-gray-900 text-base">Active Employees</h2>
                        <div className="flex items-center gap-5 flex-1 max-w-96">
                            <InputField type="text" placeholder="Search employees" iconRight="ri:search-2-line" />
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
                        totalCount={candidates?.length}
                        onPageChange={handlePageChange}
                        emptyStateText="No items to be found here."
                        onClick={({ original }) => navigate(`/jobs/${original?.job_id}/view`)}
                    />
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}