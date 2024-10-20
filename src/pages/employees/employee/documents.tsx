import React, { Fragment } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import emptyState from "@/assets/empty_state.webp";
import { Loader } from "@/components/core/Button/Loader";
import { NestedTable, RenderIf } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { useGetApplicantDocument } from "@/services/hooks/queries";
import { DocumentData, FetchedApplicantDocument } from "@/types/applicants";
import { Icon } from "@iconify/react";


export const EmployeeDocumentsPage: React.FC = () => {
    const { id: talentId } = useParams()
    const { data: talentDocuments, isFetching } = useGetApplicantDocument<FetchedApplicantDocument[]>({ user_id: talentId as string })

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
            header: "Grade",
            accessorKey: "year_awarded",
        },
        {
            header: "Status",
            accessorKey: "not_expired",
            cell: () => <div>Status</div>
        },
        {
            accessorKey: "description",
            header: "Action",
            cell: ({ parentData }: { row: any; parentData?: { has_permission: boolean } }) => {
                // const item = row.original as DocumentData;
                const hasPermission = parentData?.has_permission;

                return (
                    <button type="button" disabled={!hasPermission} className="text-xs text-gray-500 disabled:text-gray-300">
                        View
                    </button>
                );
            }
        }
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
                                dataAccessor={(item) => item.data}
                                groupAccessor={(item) => item.group_name}
                                checkPermission={(groupItem) => groupItem.has_permission}
                                parentAccessor={(item) => ({ has_permission: item.has_permission })}
                                renderHeader={() => (
                                    <button type="button" className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200">
                                        <Icon icon="ri:lock-2-line" className="size-4 text-warning-500" />
                                        <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Request Access</span>
                                    </button>
                                )}
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