import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { NestedTable, RenderIf } from "@/components/core";
import emptyState from "@/assets/empty_state.webp";
import { Loader } from "@/components/core/Button/Loader";
import { tabVariants } from "@/constants/animateVariants";
import { useGetApplicantDocument } from "@/services/hooks/queries";
import type { DocumentData, FetchedApplicantDocument, FetchedShortlistedCandidate } from "@/types/applicants";
import { format } from "date-fns";

interface TalentDocumentsProps {
    talent: FetchedShortlistedCandidate
}

export const TalentDocuments: React.FC<TalentDocumentsProps> = ({ talent }) => {
    const { data: talentDocuments, isFetching } = useGetApplicantDocument<FetchedApplicantDocument[]>({ user_id: talent?.user_id })

    const columns = [
        {
            header: "Document Name",
            accessorKey: "docname",
        },
        {
            header: "Date",
            accessorKey: "createdAt",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as DocumentData
                return (
                    <div className="whitespace-nowrap">{format(item?.createdAt, "iii. dd. MMM. yy")}</div>
                )
            }
        },
        {
            accessorKey: "year_awarded",
            header: "Grade",
        },
        {
            accessorKey: "not_expired",
            header: "Status",
            cell: () => <div>Status</div>
        },
        {
            accessorKey: "description",
            header: "Action",
            cell: () => <button>View</button>,
        },
    ];
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-5">
                    <div className="grid gap-2">
                        <h1 className="font-medium text-lg text-gray-900">Documents</h1>
                        <p className="text-base text-gray-500">Access and view documents of this candidate.</p>
                    </div>
                    <RenderIf condition={(talentDocuments !== undefined) && (talentDocuments?.length > 0)}>
                        <div className="grid w-full">
                            <NestedTable
                                data={talentDocuments ?? []}
                                columns={columns}
                                groupAccessor={(item) => item.group_name}
                                dataAccessor={(item) => item.data}
                            />
                        </div>
                    </RenderIf>
                    <RenderIf condition={talentDocuments?.length === 0}>
                        <div className="flex flex-col items-center gap-2 py-14 flex-1">
                            <img src={emptyState} alt="emptyState" className="size-24" />
                            <div className="grid gap-1 text-center">
                                <h2 className="font-medium text-base text-gray-900">No documents found</h2>
                                <p className="text-sm text-gray-600">This talent has no documents</p>
                            </div>
                        </div>
                    </RenderIf>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}