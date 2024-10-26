import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { Button, ContentDivider, Tag } from "@/components/core";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { FetchedJob } from "@/types/jobs";

interface JobInformationProps {
    job: FetchedJob
}

export const JobInformation: React.FC<JobInformationProps> = ({ job }) => {
    const navigate = useNavigate()
    const firstRow = useMemo(() => {
        return [
            { label: "Years of Experience", value: `${job?.year_exp} Years` },
            { label: "Requires Travel?", value: job?.required_travel === 0 ? "No" : "Yes" },
            { label: "Requires Relocation?", value: job?.required_relocation === 0 ? "No" : "Yes" },
        ]
    },[job?.required_relocation, job?.required_travel, job?.year_exp])
    const secondRow = useMemo(() => {
        return [
            { label: "Country", value: job?.country },
            { label: "City", value: job?.city },
            { label: "Annual Salary Expectation?", value: `$${job?.expected_salary.toLocaleString("en-US")}` },
        ]
    },[job?.city, job?.country, job?.expected_salary])
    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-900 text-xl">{job?.title}</h2>
                <Button type="button" theme="primary" variant="lighter" size="36" onClick={() => navigate(`/jobs/${job?.job_id}/edit`)}>
                    <Icon icon="ri:edit-2-line" className="size-5" />
                    Edit Job
                </Button>
            </div>
            <ContentDivider />
            <h3 className="font-medium text-gray-900 text-sm">Description</h3>
            <p className="text-gray-700 text-sm font-normal">{job?.description}</p>
            <ContentDivider />
            <div className="flex items-center flex-wrap gap-6">
                {
                    firstRow.map((item) =>
                    <div key={item.label} className="grid gap-3">
                        <span className="font-medium text-sm text-gray-900">{item?.label}</span>
                        <Tag theme="stroke">{item?.value}</Tag>
                    </div>
                    )
                }
            </div>
            <ContentDivider />
            <div className="flex items-center flex-wrap gap-6">
                {
                    secondRow.map((item) =>
                    <div key={item.label} className="grid gap-3">
                        <span className="font-medium text-sm text-gray-900">{item?.label}</span>
                        <Tag theme="stroke" className="capitalize">{item?.value}</Tag>
                    </div>
                    )
                }
            </div>
            <ContentDivider />
            <h3 className="font-medium text-gray-900 text-sm">Requirements</h3>
            <div className="flex items-center flex-wrap gap-4">
                {
                    job?.requirement?.map((item) =>
                        <Tag key={item} theme="stroke" className="capitalize">{item}</Tag>
                    )
                }
            </div>
        </motion.div>
    )
}