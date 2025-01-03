import React, { useMemo } from "react"
import { Icon } from "@iconify/react"
import { LabelList, Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ReportJobHiredCount } from "@/types/dashboard"

interface JobsHiredPerformanceProps {
    jobData: ReportJobHiredCount[]
}

const colorValues = [
    "rgba(239, 68, 68, 1)", // Chrome
    "rgba(59, 130, 246, 1)", // Safari
    "rgba(34, 197, 94, 1)", // Firefox
    "rgba(234, 179, 8, 1)", // Edge
    "rgba(249, 115, 22, 1)", // Other
];


export const JobsHiredPerformance: React.FC<JobsHiredPerformanceProps> = ({ jobData }) => {
    const chartData = useMemo(() => {
        return jobData.map((job) => ({ ...job, fill: `var(--color-${job.job_title})` }))
    }, [jobData])
    
    const chartConfig = useMemo(() => {
        const config = jobData.reduce<Record<string, { label: string; color: string }>>((acc, job, index) => {
            const key = job.job_title; // Replace key with `job_title`
            acc[key] = {
                label: job.job_title, // Use the `job_title` as the label
                color: colorValues[index] || colorValues[colorValues.length - 1], // Assign corresponding rgba color
            };
            return acc;
        }, {});
        return {
            total_hired: {
                label: "Total Hired",
            },
            ...config
        } satisfies ChartConfig
    }, [jobData])

    const percentageFormatter = (value: number) => {
        let total = chartData.reduce((acc, curr) => {
            acc += curr.total_hired;
            return acc;
        }, 0)
        return ((value/total) * 100).toFixed(2)
    }

    const findColor = (item: string) => {
        const foundItem = chartConfig[item as keyof typeof chartConfig] as { label: string; color: string; }
        return { light: foundItem?.color?.replace("1)", ".3)"), fill: foundItem?.color}
    }

    return (
        <div className="flex flex-1 flex-col rounded-2xl border-2 border-gray-100">
            <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-base text-gray-800">Jobs Hires</h3>
            </div>
            <ChartContainer config={chartConfig} className="md:mx-auto md:aspect-square h-96">
                <PieChart margin={{ left: 0 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                    <Pie data={chartData} dataKey="total_hired" nameKey="job_title" innerRadius={100}>
                        <LabelList
                            dataKey="total_hired"
                            className="fill-background font-bold text-xs font-white"
                            stroke="none"
                            formatter={(value: any) => `${percentageFormatter(value)}%`}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-3.5 p-5">
                {
                    chartData.map((item) =>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full grid place-content-center" style={{ backgroundColor: findColor(item.job_title).light }}>
                                    <div className="size-1.5 rounded-full" style={{ backgroundColor: findColor(item.job_title).fill }} />
                                </div>
                                <span className="capitalize font-medium text-sm text-gray-700">{item.job_title}</span>
                                <div className="flex items-center gap-1" style={{ color: findColor(item.job_title).fill }}>
                                    <Icon icon="ic:round-trending-up" className="size-4" />
                                    <span className="font-medium text-sm">{percentageFormatter(item.total_hired)}%</span>
                                </div>
                            </div>
                            <span className="font-medium text-sm text-gray-700">{item.total_hired} {item.total_hired === 1 ? "Hire" : "Hires"}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}