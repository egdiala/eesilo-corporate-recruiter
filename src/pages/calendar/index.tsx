import React, { useCallback, useState } from "react"
import { cn } from "@/libs/cn"
import { Icon } from "@iconify/react"
import { Button, RenderIf } from "@/components/core"
import { AnimatePresence, motion } from "framer-motion"
import { Loader } from "@/components/core/Button/Loader"
import type { FetchedCalendarEvent } from "@/types/account"
import { useGetEventCalendar } from "@/services/hooks/queries"
import { UpcomingInterviews } from "@/components/pages/calendar"
import { pageVariants, routeVariants } from "@/constants/animateVariants"
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isEqual, isSameMonth, isToday, parse, startOfToday, startOfWeek } from "date-fns"


export const CalendarPage: React.FC = () => {
    const [openInterviewModal, setOpenInterviewModal] = useState(false)
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

    let newDays = eachDayOfInterval({ start: startOfWeek(firstDayCurrentMonth), end: endOfWeek(endOfMonth(firstDayCurrentMonth)) })

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
    }

    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"))
    }

    function transformDate(dateString: string): string {
        const [monthStr, yearStr] = dateString.split("-");
        
        const months: { [key: string]: string } = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        };
        
        const month = months[monthStr];
        const year = yearStr;

        if (!month || !year) {
            throw new Error("Invalid date format. Expected 'MMM-yyyy'.");
        }

        return `${year}-${month}`;
    }

    let colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ]
    const { data: events, isLoading: isLoadingEvents } = useGetEventCalendar({ year_month: transformDate(currentMonth) })

    let [eventsToView, setEventsToView] = useState<FetchedCalendarEvent[]>([])

    const toggleInterviewModal = useCallback(() => {
        setOpenInterviewModal(!openInterviewModal)
    },[openInterviewModal])
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex flex-col gap-0 bg-white rounded-2xl p-4 lg:p-8">
                <header className="flex items-start gap-2.5 pb-6">
                    <h1 className="font-bold text-2xl text-gray-800">
                        <time dateTime="2024-05">{format(firstDayCurrentMonth, "MMM, yyyy")}</time>
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button type="button" theme="neutral" variant="ghost" size="36" onClick={previousMonth}><Icon icon="lucide:chevron-up" className="size-4" /></Button>
                        <Button type="button" theme="neutral" variant="ghost" size="36" onClick={nextMonth}><Icon icon="lucide:chevron-down" className="size-4" /></Button>
                    </div>
                </header>
                <AnimatePresence mode="popLayout">
                    {
                        !isLoadingEvents && (
                            <motion.div variants={routeVariants} initial='initial' animate='final' exit={routeVariants.initial} className="lg:flex lg:h-full lg:flex-col border-t border-l border-y-gray-200 rounded-lg overflow-hidden">
                                <div className="lg:flex lg:flex-auto lg:flex-col">
                                    <div className="grid grid-cols-7 border-b border-gray-200 text-left text-base font-medium text-gray-600 lg:flex-none">
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            S<span className="sr-only sm:not-sr-only uppercase">un</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            M<span className="sr-only sm:not-sr-only uppercase">on</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            T<span className="sr-only sm:not-sr-only uppercase">ue</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            W<span className="sr-only sm:not-sr-only uppercase">ed</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            T<span className="sr-only sm:not-sr-only uppercase">hu</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            F<span className="sr-only sm:not-sr-only uppercase">ri</span>
                                        </div>
                                        <div className="bg-white p-3 border-r border-r-gray-200">
                                            S<span className="sr-only sm:not-sr-only uppercase">at</span>
                                        </div>
                                    </div>
                                    <div className="flex text-lg leading-6 lg:flex-auto">
                                        <div className="hidden w-full lg:grid lg:grid-cols-7">
                                            {newDays.map((day, dayIdx) => (
                                            <div
                                                key={day.toString()}
                                                className={cn(
                                                isSameMonth(day, today) ? "text-gray-500" : "text-gray-400",
                                                "flex flex-col justify-between bg-white relative p-3 text-base h-28 border-r-gray-200 border-r border-b",
                                                dayIdx === 0 && colStartClasses[getDay(day)]
                                                )}
                                            >
                                                <time
                                                dateTime={format(day, "yyyy-MM-dd")}
                                                className={
                                                    isToday(day)
                                                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 font-semibold text-white"
                                                    : "flex h-6 w-6 items-center justify-center"
                                                }
                                                >
                                                {format(day, "d")}
                                                </time>
                                                <RenderIf condition={(events !== undefined) && (events.length > 0)}>
                                                    {
                                                        [events?.find((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))!]?.map((item) =>
                                                        <RenderIf key={item?._id} condition={isEqual(format(day, "yyyy-MM-dd"), item?.data?.date)}>
                                                            <ol>
                                                                <li>
                                                                    <button type="button" className="group flex w-fit bg-blue-50 px-2 py-0.5 rounded-full" onClick={() => {
                                                                        setEventsToView(events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))!)
                                                                        toggleInterviewModal()
                                                                    }}>
                                                                        <div className="flex-auto truncate text-sm font-medium text-blue-800 group-hover:text-indigo-600">
                                                                            {events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date)).length} <span className="sr-only sm:not-sr-only">Interview{events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))?.length! > 1 ? "s" : ""}</span>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ol>
                                                        </RenderIf>
                                                        )
                                                    }
                                                </RenderIf>
                                            </div>
                                            ))}
                                        </div>
                                        <div className="isolate grid w-full grid-cols-7 gap-px lg:hidden">
                                            {newDays.map((day, dayIdx) => (
                                            <button
                                                key={day.toString()}
                                                type="button"
                                                onClick={() => setSelectedDay(day)}
                                                className={cn(
                                                isSameMonth(day, today) ? "text-gray-500" : "text-gray-400",
                                                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                                                isEqual(day, selectedDay) && "text-white",
                                                !isEqual(day, selectedDay) && isToday(day) && "text-primary-500",
                                                !isEqual(day, selectedDay) && isSameMonth(day, today) && !isToday(day) && "text-gray-900",
                                                !isEqual(day, selectedDay) && !isSameMonth(day, today) && !isToday(day) && "text-gray-500",
                                                "flex flex-col justify-between bg-white relative p-3 h-auto md:h-28 border-r-gray-200 border-r border-b",
                                                dayIdx === 0 && colStartClasses[getDay(day)]
                                                )}
                                            >
                                                <time
                                                dateTime={format(day, "yyyy-MM-dd")}
                                                className={cn(
                                                    isEqual(day, selectedDay) && "flex h-6 w-6 items-center justify-center rounded-full",
                                                    isEqual(day, selectedDay) && isToday(day) && "bg-primary-500",
                                                    isEqual(day, selectedDay) && !isToday(day) && "bg-warning-600",
                                                    "ml-auto text-sm",
                                                )}
                                                >
                                                {format(day, "d")}
                                                </time>
                                                <RenderIf condition={(events !== undefined) && (events.length > 0)}>
                                                    {
                                                        [events?.find((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))!]?.map((item) =>
                                                        <RenderIf key={item?._id} condition={isEqual(format(day, "yyyy-MM-dd"), item?.data?.date)}>
                                                            <ol>
                                                                <li>
                                                                    <button type="button" className="group flex w-fit bg-blue-50 px-1 py-0.5 rounded-full" onClick={() => {
                                                                        setEventsToView(events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))!)
                                                                        toggleInterviewModal()
                                                                    }}>
                                                                        <div className="flex-auto truncate text-xs font-medium text-blue-800 group-hover:text-indigo-600">
                                                                            {events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date)).length} <span className="sr-only sm:not-sr-only">Interview{events?.filter((singleEvent) => isEqual(format(day, "yyyy-MM-dd"), singleEvent?.data?.date))?.length! > 1 ? "s" : ""}</span>
                                                                        </div>
                                                                    </button>
                                                                </li>
                                                            </ol>
                                                        </RenderIf>
                                                        )
                                                    }
                                                </RenderIf>
                                            </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                <AnimatePresence mode="popLayout">
                    {
                        isLoadingEvents && (
                            <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                        )
                    }
                </AnimatePresence>
                <UpcomingInterviews events={eventsToView} isOpen={openInterviewModal} onClose={toggleInterviewModal} />
            </div>
        </motion.div>
    )
}