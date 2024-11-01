import React from "react"
import { Icon } from "@iconify/react"
import { LabelList, Pie, PieChart } from "recharts"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const JobsPerformance: React.FC = () => {

    const chartData = [
        { browser: "chrome", visitors: 27, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: 20, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: 18, fill: "var(--color-firefox)" },
        { browser: "edge", visitors: 17, fill: "var(--color-edge)" },
        { browser: "other", visitors: 9, fill: "var(--color-other)" },
    ]
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        chrome: {
            label: "Chrome",
            color: "rgba(239, 68, 68, 1)",
        },
        safari: {
            label: "Safari",
            color: "rgba(59, 130, 246, 1)",
        },
        firefox: {
            label: "Firefox",
            color: "rgba(34, 197, 94, 1)",
        },
        edge: {
            label: "Edge",
            color: "rgba(234, 179, 8, 1)",
        },
        other: {
            label: "Other",
            color: "rgba(249, 115, 22, 1)",
        },
    } satisfies ChartConfig

    const percentageFormatter = (value: number) => {
        let total = chartData.reduce((acc, curr) => {
            acc += curr.visitors;
            return acc;
        }, 0)
        return ((value/total) * 100).toFixed(2)
    }

    const findColor = (item: string) => {
        const foundItem = chartConfig[item as keyof typeof chartConfig] as { label: string; color: string; }
        return { light: foundItem.color.replace("1)", ".3)"), fill: foundItem.color}
    }

    return (
        <div className="flex flex-1 flex-col rounded-2xl border-2 border-gray-100">
            <div className="flex items-center justify-between p-5">
                <h3 className="font-semibold text-base text-gray-800">Jobs Performance</h3>
                <Menu>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-base text-gray-600">Sort By:</span>
                        <MenuButton className="inline-flex items-center gap-2 rounded-md p-0 focus:outline-none data-[focus]:outline-0">
                            <span className="font-medium text-base text-gray-400">Hires</span>
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
                            Shortlists
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button className="group flex w-full items-center justify-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                            Rejected
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
            <ChartContainer config={chartConfig} className="md:mx-auto md:aspect-square h-96">
                <PieChart margin={{ left: 0 }}>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" hideLabel />} />
                    <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={100}>
                        <LabelList
                            dataKey="visitors"
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
                                <div className="size-3 rounded-full grid place-content-center" style={{ backgroundColor: findColor(item.browser).light }}>
                                    <div className="size-1.5 rounded-full" style={{ backgroundColor: findColor(item.browser).fill }} />
                                </div>
                                <span className="capitalize font-medium text-sm text-gray-700">{item.browser}</span>
                                <div className="flex items-center gap-1" style={{ color: findColor(item.browser).fill }}>
                                    <Icon icon="ic:round-trending-up" className="size-4" />
                                    <span className="font-medium text-sm">{percentageFormatter(item.visitors)}%</span>
                                </div>
                            </div>
                            <span className="font-medium text-sm text-gray-700">{item.visitors} Hires</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}