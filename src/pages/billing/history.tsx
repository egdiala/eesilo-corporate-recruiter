import React, { useEffect, useMemo, useState } from "react";
import money from "@/assets/money.png";
import { format, isPast } from "date-fns";
import { capitalizeWords } from "@/utils/capitalize";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetSubscription } from "@/services/hooks/queries";
import { useLocation, useSearchParams } from "react-router-dom";
import { FetchedSubscriptionHistory } from "@/types/subscription";
import { ContentDivider, RenderIf, Table } from "@/components/core";
import { getPaginationParams, setPaginationParams } from "@/hooks/usePaginationParams";

export const BillingsHistoryPage: React.FC = () => {
    const location = useLocation()
    const [page, setPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: count } = useGetSubscription<{ total: number; }>({ component: "count" })
    const { data: plans, isLoading: fetchingPlans } = useGetSubscription<FetchedSubscriptionHistory[]>({ page: page.toString(), item_per_page: itemsPerPage.toString() })

    const currentPlan = useMemo(() => {
        if (plans && plans?.length > 0) {
            return plans.find((plan) => !isPast(plan.end_date))
        }
        return null
    },[plans])
    
    const columns = [
        {
            header: () => "Plan",
            accessorKey: "plan_name",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedSubscriptionHistory
                return (
                    <div className="text-gray-800 text-sm whitespace-nowrap capitalize">{item?.plan_name}</div>
                )
            }
        },
        {
            header: () => "Amount",
            accessorKey: "sub_amount",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedSubscriptionHistory
                return (
                    <div className="text-gray-800 text-sm whitespace-nowrap">${item?.sub_amount}</div>
                )
            }
        },
        {
            header: () => "Date",
            accessorKey: "start_date",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as FetchedSubscriptionHistory
                return (
                    <div className="text-gray-800 text-sm whitespace-nowrap">{format(item?.start_date, "eee. dd. MMM yy")}</div>
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
        <AnimatePresence>
            {
                !fetchingPlans ? (
                    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="w-full max-w-[33.75rem]">
                        <div className="flex flex-col gap-6 bg-white rounded-2xl">
                            <div className="grid gap-2">
                                <h1 className="font-medium text-lg text-gray-900">Billing History</h1>
                                <p className="text-base text-gray-400">Edit and change payment method for subscriptions and payments</p>
                            </div>
                            <ContentDivider />
                            <RenderIf condition={!!currentPlan?.plan_id}>
                                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                                    <h2 className="font-medium text-base text-gray-900">Current Plan</h2>
                                    <div className="flex-1 bg-gray-100 p-2 flex items-start gap-2 rounded-lg" style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}>
                                        <img src={money} alt="money" className="h-12 w-14" />
                                        <div className="grid">
                                            <h3 className="font-medium text-base text-black">${currentPlan?.sub_amount}/{currentPlan?.sub_duration === 1 ? "month" : "year"}</h3>
                                            <p className="text-xs/5 text-gray-500">{capitalizeWords(currentPlan?.plan_name as string)} plan</p>
                                            <p className="text-xs/5 text-gray-500">Expires on the {format(currentPlan?.end_date as string, "do MMMM, yyyy")}</p>
                                        </div>
                                    </div>
                                </div>
                            </RenderIf>
                            <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                                <h2 className="font-medium text-base text-gray-900">Billing History</h2>
                                <Table
                                    columns={columns}
                                    data={plans ?? []}
                                    page={page}
                                    perPage={itemsPerPage}
                                    totalCount={count?.total}
                                    onPageChange={handlePageChange}
                                    emptyStateText="No subscriptions have been made."
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex w-full h-96 items-center justify-center">
                        <Loader className="spinner size-6 text-primary-500" />
                    </div>
                )
            }
        </AnimatePresence>
    )
}