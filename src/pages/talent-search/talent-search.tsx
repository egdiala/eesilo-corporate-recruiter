import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useDebounce } from "@/hooks/useDebounce"
import type { FetchedTalent, FetchedTalentCount } from "@/types/applicants"
import { Loader } from "@/components/core/Button/Loader"
import { useGetTalents } from "@/services/hooks/queries"
import { pageVariants, routeVariants } from "@/constants/animateVariants"
import { TalentCard, TalentSearchFilter } from "@/components/pages/talent"
import { Button, EmptyState, InputField, Pagination, RenderIf } from "@/components/core"
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams"

export const TalentSearchPage: React.FC = () => {
    const location = useLocation();
    const [filters, setFilters] = useState({})
    const { value: keyword, onChangeHandler } = useDebounce(500)
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: candidates, isFetching } = useGetTalents<FetchedTalent[]>({ keyword, page: page.toString(), item_per_page: itemsPerPage.toString(), ...filters })
    const { data: count, isFetching: fetchingCount } = useGetTalents<FetchedTalentCount>({ component: "count", page: page.toString(), item_per_page: itemsPerPage.toString(), keyword, ...filters })

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
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-scroll">
            <div className="bg-white rounded-2xl lg:p-8">
                <div className="flex flex-col gap-5 border border-gray-200 rounded-xl p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <h2 className="font-medium text-base text-gray-900">Find your next employee</h2>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-5 flex-1">
                            <div className="flex-1 lg:max-w-80">
                                <InputField placeholder="Input Keyword" type="text" size="40" iconRight="ri:search-2-line" onChange={onChangeHandler} />
                            </div>
                            <div className="flex items-center justify-end gap-5">
                                <Button type="button" theme="primary" variant="filled" size="40" block>
                                    <Icon icon="ri:search-2-line" className="size-5" />
                                    Search
                                </Button>
                                <TalentSearchFilter filters={filters} setFilters={setFilters} />
                            </div>
                        </div>
                    </div>
                    <RenderIf condition={!isFetching && !fetchingCount}>
                        <RenderIf condition={candidates?.length! > 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-5">
                                <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 grid">
                                    {
                                        candidates?.map((item) =>
                                            <TalentCard key={item?.user_id} talent={item!} as={Link} to={`/talent/${item?.user_id}/view`} />
                                        )
                                    }
                                </div>
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
                            </motion.div>
                        </RenderIf>
                        <RenderIf condition={candidates?.length! === 0}>
                            <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="flex items-center justify-center">
                                <EmptyState emptyStateText="No talent found here." />
                            </motion.div>
                        </RenderIf>
                    </RenderIf>
                    <RenderIf condition={isFetching || fetchingCount}>
                        <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                    </RenderIf>
                </div>
            </div>
        </motion.div>
    )
}