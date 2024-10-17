import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { format, getYear, startOfYear } from "date-fns";
import DatePicker from "react-datepicker";
import { JobYearlyCountType } from "@/types/dashboard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Loader } from "@/components/core/Button/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants } from "@/constants/animateVariants";

const chartData = [
  { month: "January", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "February", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "March", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "April", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "May", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "June", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "July", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "August", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "September", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "October", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "November", invited: 0, accepted: 0, rejected: 0, hired: 0 },
  { month: "December", invited: 0, accepted: 0, rejected: 0, hired: 0 },
]

const chartConfig = {
  invited: {
    label: "Invited",
    color: "hsl(var(--chart-1))",
  },
  accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-2))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
  hired: {
    label: "Hired",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface Filter {
    year: string;
}

interface PerformanceStatsProps {
    yearData: JobYearlyCountType[]
    // eslint-disable-next-line no-unused-vars
    setFilters: (v: Filter) => void;
    filters: Filter;
    loading: boolean;
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({ filters, loading, setFilters, yearData }) => {

    const updatedChartData = useMemo(() => {
        return chartData.map(data => {
            // Find corresponding jobYearlyData entry based on the month number
            const jobData = yearData.find(job => {
                const monthName = format(new Date(2023, parseInt(job.month) - 1), "MMMM"); // Get the full month name
                return monthName === data.month;
            });
            
            if (jobData) {
                // Update the data with values from jobYearlyData
                return {
                    ...data,
                    invited: jobData.total_invited,
                    accepted: jobData.total_accepted,
                    rejected: jobData.total_rejected,
                    hired: jobData.total_offer,
                };
            }

            // Return the original data if no match is found
            return data;
        });
    }, [yearData])
    
    const totalSums = useMemo(() => {
        return yearData.reduce((acc, curr) => {
            acc.total_invited += curr.total_invited;
            acc.total_accepted += curr.total_accepted;
            acc.total_rejected += curr.total_rejected;
            acc.total_offer += curr.total_offer;
            return acc;
        },{ total_invited: 0, total_accepted: 0, total_rejected: 0, total_offer: 0 });
    },[yearData])

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between md:p-5">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-gray-00">Performance</h3>
                    <AnimatePresence mode="popLayout">
                        {
                            loading && (
                                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial}>
                                    <Loader className="spinner size-3.5 text-primary-500" />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div className="grid relative">
                    <DatePicker
                        selected={startOfYear(filters?.year)}
                        onChange={(date) => setFilters({ year: getYear(date as Date).toString() })}
                        minDate={startOfYear("2024")}
                        popperPlacement="bottom-end"
                        showYearPicker
                        dateFormat="yyyy"
                        customInput={
                            <button type="button" className="inline-flex items-center gap-2 rounded-md p-0 focus:outline-none data-[focus]:outline-0">
                                <span className="font-medium text-base text-gray-600">{filters?.year}</span>
                                <Icon icon="ri:arrow-down-s-line" className="size-6 text-gray-900" />
                            </button>
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center gap-5 xl:gap-0">
                <div className="flex flex-col md:p-5 gap-5">
                    <span className="font-medium text-sm text-[#475569]">From Jan 2024 to July 2024</span>
                    <div className="grid grid-cols-4 xl:grid-cols-1 gap-4">
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Invited</span>
                            <h4 className="font-semibold text-3xl text-blue-500">{totalSums?.total_invited}</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Accepted</span>
                            <h4 className="font-semibold text-3xl text-success-500">{totalSums?.total_accepted}</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Rejected</span>
                            <h4 className="font-semibold text-3xl text-success-500">{totalSums?.total_rejected}</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-medium text-sm text-[#475569]">Total Hired</span>
                            <h4 className="font-semibold text-3xl text-warning-500">{totalSums?.total_offer}</h4>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <ChartContainer config={chartConfig} className="min-h-auto max-h-96 w-full -ml-5 md:ml-0 pl-0">
                        <BarChart accessibilityLayer data={updatedChartData} width={5} margin={{ left: -20 }} barSize={4} barGap={8}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Bar dataKey="invited" fill="var(--color-invited)" radius={[4,4,0,0]} />
                            <Bar dataKey="accepted" fill="var(--color-accepted)" radius={[4,4,0,0]} />
                            <Bar dataKey="rejected" fill="var(--color-rejected)" radius={[4,4,0,0]} />
                            <Bar dataKey="hired" fill="var(--color-hired)" radius={[4,4,0,0]} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    )
}