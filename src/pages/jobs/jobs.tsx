import React from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { JobCard } from "@/components/pages/jobs"
import { useGetJobs } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { Button, InputField, RenderIf } from "@/components/core"

export const JobsPage: React.FC = () => {
    const { data: jobs, isFetching } = useGetJobs()

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="bg-white rounded-2xl lg:p-8">
            <div className="flex flex-col gap-5 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium text-base text-gray-900">Posted Jobs</h2>
                    <div className="flex items-center justify-end gap-5 flex-1">
                        <div className="flex-1 max-w-80">
                            <InputField placeholder="Search Jobs" type="text" size="40" iconRight="ri:search-2-line" />
                        </div>
                        <Button theme="neutral" variant="stroke" size="40">
                            <Icon icon="ri:list-unordered" className="size-5" />
                        </Button>
                        <Button theme="primary" variant="filled" size="40">
                            <Icon icon="ri:briefcase-4-line" className="size-5" />
                            Post New Job
                        </Button>
                    </div>
                </div>
                <RenderIf condition={!isFetching}>
                    <div className="grid grid-cols-2 gap-5">
                        {
                            jobs?.map((_, item) =>
                                <JobCard key={item} />
                            )
                        }
                    </div>
                </RenderIf>
                <RenderIf condition={isFetching}>
                    <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
                </RenderIf>
            </div>
        </motion.div>
    )
}