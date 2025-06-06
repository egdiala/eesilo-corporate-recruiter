import React, { useCallback, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import money from "@/assets/money.png";
import { ContentDivider, RenderIf } from "@/components/core";
import { pageVariants } from "@/constants/animateVariants";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { AddPaymentMethodModal } from "@/components/pages/billing";
import { useGetSavedCard, useGetSubscription } from "@/services/hooks/queries";
import { FetchedCard, FetchedSubscriptionHistory } from "@/types/subscription";
import { format, isPast } from "date-fns";
import { capitalizeWords } from "@/utils/capitalize";
import { Loader } from "@/components/core/Button/Loader";


export const BillingsMethodPage: React.FC = () => {
    const [openPaymentMethodModal, setOpenPaymentModal] = useState(false)
    const { data: cards, isLoading: fetchingCards } = useGetSavedCard<FetchedCard[]>({})
    const { data: subHistory } = useGetSubscription<FetchedSubscriptionHistory[]>({ })
    let [selected, setSelected] = useState(cards?.[0])

    const currentPlan = useMemo(() => {
        if (subHistory && subHistory?.length > 0) {
            return subHistory.find((plan) => !isPast(plan.end_date))
        }
        return null
    }, [subHistory])

    const togglePaymentMethod = useCallback(() => {
        setOpenPaymentModal(!openPaymentMethodModal)
    },[openPaymentMethodModal])
    return (
        <AnimatePresence>
            {
                (!fetchingCards) ? (
                    <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="w-full max-w-[33.75rem]">
                        <div className="flex flex-col gap-6 bg-white rounded-2xl">
                            <div className="grid gap-2">
                                <h1 className="font-medium text-lg text-gray-900">Payment Methods</h1>
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
                                            <p className="text-xs/5 text-gray-500">Expires on the {format(currentPlan?.end_date || new Date(), "do MMMM, yyyy")}</p>
                                        </div>
                                    </div>
                                </div>
                            </RenderIf>
                            <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
                                <h2 className="font-medium text-base text-gray-900">Saved Payment Methods</h2>
                                <RenderIf condition={(cards !== undefined) && (cards?.length > 0)}>
                                    <RadioGroup value={selected} onChange={setSelected} aria-label="Server size" className="flex flex-col gap-4">
                                    {cards?.map((card) => (
                                        <Radio
                                            key={card?.card_id}
                                            value={card}
                                            className="group relative flex cursor-pointer rounded-xl border border-gray-200 p-4 gap-3.5 text-gray-600 transition duration-500 ease-out focus:outline-none data-[focus]:border-primary-300 data-[checked]:border-primary-500 data-[checked]:text-gray-900"
                                        >
                                            <RenderIf condition={card?.brand === "visa"}>
                                                <div className="flex items-center justify-center w-8 h-6 rounded-md bg-[#1B39C3]">
                                                    <Icon icon="ri:visa-line" className="w-6 h-5 text-white" />
                                                </div>
                                            </RenderIf>
                                            <RenderIf condition={card?.brand === "mastercard"}>
                                                <div className="flex items-center justify-center -space-x-1.5 w-8 h-6 rounded-md bg-[#252525]">
                                                    <div className="size-3.5 rounded-full bg-[#EB001B] mix-blend-difference" />
                                                    <div className="size-3.5 rounded-full bg-[#F79E1B] z-10 mix-blend-color-dodge" />
                                                </div>
                                            </RenderIf>
                                            <RenderIf condition={(card?.brand !== "visa") && (card?.brand !== "mastercard")}>
                                                <div className="flex items-center justify-center p-[3px] w-8 h-6 rounded-md bg-transparent">
                                                    <div className="flex flex-col p-1 gap-[0.3125rem] w-[1.625rem] h-[1.1625rem] rounded bg-[#CACFD8] placeholder-card-1 placeholder-card-2 placeholder-card-3" style={{ borderBottom: "1px solid var(--alpha-white-alpha-10, rgba(255, 255, 255, 0.1))" }}>
                                                        <div className="w-[0.1875rem] h-[0.1875rem] rounded-full bg-white" />
                                                        <div className="flex items-center gap-0.5">
                                                            <div className="w-2 bg-white h-0.5 rounded" />
                                                            <div className="w-2 bg-white h-0.5 rounded" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </RenderIf>
                                            <Label className="flex-1 flex-col gap-1">
                                                <div className="flex-1 flex gap-3">
                                                    <span className="font-medium text-sm text-gray-900">**** **** **** {card?.pan}</span>
                                                    <div className="hidden group-data-[checked]:md:flex items-center uppercase bg-primary-100 py-0.5 px-2 text-primary-800 font-medium text-xs/3 rounded-full">Selected</div>
                                                </div>
                                                <p className="text-xs text-gray-500">Expires {card?.exp_month?.toString().padStart(2, "0")}/{card?.exp_year?.toString()?.substring(2)}</p>
                                            </Label>
                                            <span className="size-5 grid place-content-center rounded-full bg-white border border-gray-200 group-data-[checked]:border-primary-700 group-data-[checked]:bg-primary-500 transition duration-500 ease-out" style={{ boxShadow: "0px 2px 2px 0px rgba(27, 28, 29, 0.12) inset" }}>
                                                <div className="hidden group-data-[checked]:grid size-2 bg-white rounded-full shadow-[0px -2px 3px 0px rgba(207, 209, 211, 1) inset]" style={{ boxShadow: "0px 2px 2px 0px rgba(27, 28, 29, 0.12)" }} />
                                            </span>
                                        </Radio>
                                    ))}
                                    </RadioGroup>
                                </RenderIf>
                                <button type="button" className="border border-dashed border-gray-300 p-4 gap-3.5 flex items-start rounded-xl" onClick={togglePaymentMethod}>
                                    <Icon icon="ri:bank-card-line" className="size-6 text-gray-500" />
                                    <div className="grid justify-items-start gap-1">
                                        <h3 className="font-medium text-sm text-gray-900">New Method</h3>
                                        <p className="text-sm text-gray-500">Add a new payment method</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <AnimatePresence>
                            {
                                openPaymentMethodModal ? (
                                    <AddPaymentMethodModal isOpen={openPaymentMethodModal} onClose={togglePaymentMethod} />
                                ) : null
                            }
                        </AnimatePresence>
                        
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