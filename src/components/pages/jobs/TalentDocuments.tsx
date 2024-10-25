import React, { Fragment, useCallback, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import emptyState from "@/assets/empty_state.webp";
import { Loader } from "@/components/core/Button/Loader";
import { NestedTable, RenderIf } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { useGetApplicantDocument } from "@/services/hooks/queries";
import { DocumentAccessModal, DocumentRequestSendModal } from "../employees";
import type { DocumentData, FetchedApplicantDocument, FetchedShortlistedCandidate, RequestDocumentParams } from "@/types/applicants";

interface TalentDocumentsProps {
    talent: FetchedShortlistedCandidate
}

export const TalentDocuments: React.FC<TalentDocumentsProps> = ({ talent }) => {
    const { data: talentDocuments, isFetching } = useGetApplicantDocument<FetchedApplicantDocument[]>({ user_id: talent?.user_id })
    const [toggleModals, setToggleModals] = useState({
        openSendRequest: false,
        openRequestSent: false,
        item: null as RequestDocumentParams | null
    })

    const toggleSendRequest = useCallback((item: RequestDocumentParams | null = null) => {
        setToggleModals((prev) => ({
            ...prev,
            item: item,
            openSendRequest: !toggleModals.openSendRequest,
        }))
    },[toggleModals.openSendRequest])

    const toggleRequestSent = useCallback(() => {
        setToggleModals((prev) => ({
            ...prev,
            openRequestSent: !toggleModals.openRequestSent,
        }))
    },[toggleModals.openRequestSent])

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
            cell: ({ parentData }: { row: any; parentData?: { has_permission: boolean } }) => {
                // const item = row.original as DocumentData;
                const hasPermission = parentData?.has_permission;

                return (
                    <button type="button" disabled={!hasPermission} className="text-xs text-gray-500 disabled:text-gray-300">
                        View
                    </button>
                );
            }
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
                                dataAccessor={(item) => item.data}
                                groupAccessor={(item) => item.group_name}
                                checkPermission={(groupItem) => groupItem.has_permission}
                                parentAccessor={(item) => ({ has_permission: item.has_permission })}
                                renderHeader={(groupItem) => {
                                    const item = groupItem.data[0];
                                    return (
                                        <button type="button" className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200" onClick={() => toggleSendRequest({ docat_id: item?.docat_id, user_id: item?.user_id })}>
                                            <Icon icon="ri:lock-2-line" className="size-4 text-warning-500" />
                                            <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Request Access</span>
                                        </button>
                                    )
                                }}
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
                <DocumentAccessModal isOpen={toggleModals.openSendRequest} onClose={toggleSendRequest} params={toggleModals.item as RequestDocumentParams} onSuccess={() => {
                    toggleSendRequest(null);
                    toggleRequestSent()
                }} />
                <DocumentRequestSendModal isOpen={toggleModals.openRequestSent} onClose={toggleRequestSent} />
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}