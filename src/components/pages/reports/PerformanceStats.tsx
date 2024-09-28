import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { JobYearlyCountType } from "@/types/dashboard";
import { format } from "date-fns";

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

interface PerformanceStatsProps {
    yearData: JobYearlyCountType[]
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({ yearData }) => {

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
        <div className="flex flex-col pb-5">
            <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-base text-gray-00">Performance</h3>
                <Menu>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-base text-gray-600">Sort By:</span>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md p-0 focus:outline-none data-[focus]:outline-0">
                            <span className="font-medium text-base text-gray-400">Yearly</span>
                            <Icon icon="ri:arrow-down-s-line" className="size-6 text-gray-900" />
                        </MenuButton>
                    </div>

                    <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-20 origin-top-right rounded-xl shadow bg-white p-1 text-sm/6 text-gray-600 transition duration-300 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <MenuItem>
                            <button className="group flex w-full items-center justify-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                            2023
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center justify-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                            2024
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center gap-5 xl:gap-0">
                <div className="flex flex-col py-5 pr-5 pl-10 gap-5">
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
                <ChartContainer config={chartConfig} className="min-h-auto max-h-96 flex-1 ml-0 pl-0">
                    <BarChart accessibilityLayer data={updatedChartData} width={5} margin={{ right: 40 }} barSize={4} barGap={8}>
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
    )
}