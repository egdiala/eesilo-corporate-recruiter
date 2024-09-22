import React, { Fragment, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { JobCard } from "@/components/pages/jobs"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useGetJobs } from "@/services/hooks/queries"
import { AnimatePresence, motion } from "framer-motion"
import { Loader } from "@/components/core/Button/Loader"
import { Button, InputField, Pagination, RenderIf, Table } from "@/components/core"
import { pageVariants, routeVariants } from "@/constants/animateVariants"
import emptyState from "@/assets/empty_state.webp";
import type { FetchedJob, FetchedJobCount } from "@/types/jobs"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"
import { useDebounce } from "@/hooks/useDebounce"

export const JobsPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const { value, onChangeHandler } = useDebounce(500)
    const { data: count, isFetching: fetchingCount } = useGetJobs<FetchedJobCount>({ page: page.toString(), item_per_page: itemsPerPage.toString(), component: "count" })
    const { data: jobs, isFetching: fetchingJobs } = useGetJobs<FetchedJob[]>({ page: page.toString(), item_per_page: itemsPerPage.toString(), q: value })
    const [gridView, setGridView] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();

    const columns = [
        {
            header: () => "Job Title",
            accessorKey: "title",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedJob
                return (
                    <div className="text-gray-800 text-sm whitespace-nowrap">{item?.title}</div>
                )
            }
        },
        {
            header: () => "Description",
            accessorKey: "description",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedJob
                return (
                    <div className="text-gray-800 text-sm line-clamp-1 w-96 md:w-auto">{item?.description}</div>
                )
            }
        },
        {
            header: () => "Invited",
            accessorKey: "total_invited",
        },
        {
            header: () => "Accepted",
            accessorKey: "total_accepted",
        },
        {
            header: () => "Pending",
            accessorKey: "total_pending",
        },
        {
            header: () => "Declined",
            accessorKey: "total_declined",
        },
    ];

    const handlePageChange = (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setPage(page)
        setPaginationParams(page, itemsPerPage, searchParams, setSearchParams)
    };

    // Function to navigate to previous page
    const prev = () => {
        if (page > 1) {
            handlePageChange(page - 1);
        }
    };

    // Function to navigate to next page
    const next = () => {
        if (page < count?.total!) {
            handlePageChange(page + 1);
        }
    };

    useEffect(() => {
        getPaginationParams(location, setPage, () => {})
    }, [location, setPage])

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-8 pt-5 pb-10 view-page-container overflow-y-scroll">
            <div className="bg-white rounded-2xl lg:p-8">
                <div className="flex flex-col gap-5 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-base text-gray-900">Posted Jobs</h2>
                        <div className="flex items-center justify-end gap-5 flex-1">
                            <div className="flex-1 max-w-80">
                                <InputField placeholder="Search Jobs" type="text" size="40" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                            </div>
                            <Button type="button" theme="neutral" variant="stroke" size="40" onClick={() => setGridView(!gridView)}>
                                <Icon icon={gridView ? "ri:list-unordered" : "ri:layout-grid-line"} className="size-5" />
                            </Button>
                            <Button type="button" theme="primary" variant="filled" size="40" onClick={() => navigate("create")}>
                                <Icon icon="ri:briefcase-4-line" className="size-5" />
                                Post New Job
                            </Button>
                        </div>
                    </div>
                    <RenderIf condition={!fetchingJobs && !fetchingCount}>
                        <RenderIf condition={jobs !== undefined && jobs?.length > 0}>
                            <AnimatePresence mode="popLayout">
                                {
                                    gridView && (
                                        <Fragment>
                                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid grid-cols-2 gap-5">
                                                {
                                                    jobs?.map((item) =>
                                                        <JobCard key={item?.job_id} job={item!} as={Link} to={`/jobs/${item?.job_id}/view`} />
                                                    )
                                                }
                                            </motion.div>
                                            <RenderIf condition={count?.total! > 0}>
                                                <Pagination
                                                    className="px-0 py-3"
                                                    count={count?.total}
                                                    currentPage={page}
                                                    dataLength={count?.total}
                                                    totalPages={Math.ceil(count?.total! / itemsPerPage)}
                                                    prev={prev}
                                                    next={next}
                                                />
                                            </RenderIf>
                                        </Fragment>
                                    )
                                }
                            </AnimatePresence>
                            <AnimatePresence mode="popLayout">
                                {
                                    !gridView && (
                                        <Table
                                            columns={columns}
                                            data={jobs ?? []}
                                            page={page}
                                            perPage={itemsPerPage}
                                            totalCount={count?.total}
                                            onPageChange={handlePageChange}
                                            emptyStateText="No items to be found here."
                                            onClick={({ original }) => navigate(`/jobs/${original?.job_id}/view`)}
                                        />
                                    )
                                }
                            </AnimatePresence>
                        </RenderIf>
                        <RenderIf condition={jobs !== undefined && jobs.length === 0}>
                            <AnimatePresence mode="popLayout">
                                <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid place-content-center">
                                    <div className="flex flex-col items-center gap-2 py-14 flex-1">
                                        <img src={emptyState} alt="emptyState" className="size-24" />
                                        <div className="grid gap-1 text-center">
                                            <h2 className="font-medium text-base text-gray-900">You have not posted any job</h2>
                                            <p className="text-sm text-gray-600">Post new jobs to view them here</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </RenderIf>
                    </RenderIf>
                    <RenderIf condition={fetchingJobs || fetchingCount}>
                        <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                    </RenderIf>
                </div>
            </div>
        </motion.div>
    )
}