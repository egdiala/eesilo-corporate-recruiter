import React, { useMemo, useState } from "react";
import { cn } from "@/libs/cn";
import money from "@/assets/money.png";
import { AnimatePresence, motion } from "framer-motion";
import type { FetchedPlan, FetchedSubscriptionHistory } from "@/types/subscription";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetSubscription } from "@/services/hooks/queries";
import { useInitSubscription } from "@/services/hooks/mutations";
import { Button, CheckBox, ContentDivider, RenderIf, Toggle } from "@/components/core";
import { useNavigate } from "react-router-dom";
import { format, isPast } from "date-fns";
import { capitalizeWords } from "@/utils/capitalize";

export const BillingPlansPage: React.FC = () => {
    const navigate = useNavigate()
    const [isYearly, setIsYearly] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<FetchedPlan | null>(null)
    const { data: plans, isLoading: fetchingPlans } = useGetSubscription<FetchedPlan[]>({ component: "subplan" })
    const { data: subHistory, isLoading: fetchingSubHistoryPlans } = useGetSubscription<FetchedSubscriptionHistory[]>({ })

    const currentPlan = useMemo(() => {
        if (subHistory && subHistory?.length > 0) {
            return subHistory.find((plan) => !isPast(plan.end_date))
        }
        return null
    }, [subHistory])
    
    const { mutate, isPending } = useInitSubscription((value) => {
        navigate(`/billings/checkout?price=${value?.amount}&plan=${selectedPlan?.plan_name}`)
    })

    const subscribe = (plan: FetchedPlan) => {
        setSelectedPlan(plan)
        mutate({ plan_id: plan?.plan_id, plan_duration: isYearly ? "2" : "1" })
    }
    return (
        <AnimatePresence>
            {
                (!fetchingPlans || !fetchingSubHistoryPlans) ? (
                    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="">
                        <div className="flex flex-col gap-6 bg-white rounded-2xl">
                            <div className="grid gap-2">
                                <h1 className="font-medium text-lg text-gray-900">Plans</h1>
                                <p className="text-base text-gray-400">Manage and upgrade your plans</p>
                            </div>
                            <ContentDivider />
                            <RenderIf condition={!!currentPlan?.plan_id}>
                                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                                    <h2 className="font-medium text-base text-gray-900">Your Current Plan</h2>
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
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center py-4 px-5 gap-4 w-fit mx-auto border border-gray-200 rounded-full">
                                    <span className="font-medium text-xs text-black">Monthly</span>
                                    <Toggle onChange={() => setIsYearly(!isYearly)} checked={isYearly} />
                                    <span className="font-medium text-xs text-black">Yearly</span>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {
                                        plans?.sort((a,b) => a.monthly_cost > b.monthly_cost ? 1 : -1).map((plan, index) =>
                                            <div key={plan?.plan_id} className="flex flex-col border border-gray-200 bg-white rounded-2xl">
                                                <div className="pb-8 px-8 pt-[3.75rem] grid gap-4 justify-items-center relative">
                                                    <RenderIf condition={plan?.is_default === 1}>
                                                        <div className="absolute bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-b-xl">Recommended</div>
                                                    </RenderIf>
                                                    <div className="grid gap-2 justify-items-center">
                                                        <div className={cn("py-0.5 px-2 rounded-full text-center font-medium text-xs w-fit capitalize", index === 0 ? "bg-success-100 text-success-800" : index === 2 ? "bg-blue-50 text-blue-800" : "bg-warning-100 text-warning-900")}>{plan?.plan_name} plan</div>
                                                        <h3 className="font-semibold text-4xl text-gray-900">${isYearly ? `${plan?.yearly_cost}/yr` : `${plan?.monthly_cost}/mth`}</h3>
                                                    </div>
                                                    <Button type="button" theme="primary" variant="filled" size="40" disabled={isPending} loading={(isPending) && (selectedPlan?.plan_id === plan?.plan_id)} onClick={() => subscribe(plan)} block>Select Plan</Button>
                                                </div>
                                                <div className="pb-10 px-8 grid gap-4">
                                                    {
                                                        Array.from({ length: 4 }).map((_, index) =>
                                                            <CheckBox
                                                                checked
                                                                key={index}
                                                                label={<div className="font-medium text-sm text-gray-900">Feature content {index + 1}</div>}
                                                            />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
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