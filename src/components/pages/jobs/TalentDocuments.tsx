import React, { Fragment, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import emptyState from "@/assets/empty_state.webp";
import { Loader } from "@/components/core/Button/Loader";
import { NestedTable, RenderIf } from "@/components/core";
import { tabVariants } from "@/constants/animateVariants";
import { useGetApplicantDocument } from "@/services/hooks/queries";
import { AccessDocumentCode, DocumentAccessModal, DocumentRequestSendModal } from "../employees";
import type { DocumentData, FetchedApplicantDocument, FetchedShortlistedCandidate, RequestDocumentParams } from "@/types/applicants";

interface TalentDocumentsProps {
    talent: FetchedShortlistedCandidate
}

export const TalentDocuments: React.FC<TalentDocumentsProps> = ({ talent }) => {
    const [documentFilters, setDocumentFilters] = useState({
        user_id: ""
    })
    const { data: talentDocuments, isLoading } = useGetApplicantDocument<FetchedApplicantDocument[]>({ user_id: talent?.user_id })
    const { data: viewDoc, isSuccess } = useGetApplicantDocument<{ link: string; }>({ ...documentFilters })

    useEffect(() => {
        if (isSuccess) {
            window.open(`${import.meta.env.VITE_NEESILO_USER_SERVICE_URL}/business/fnviewers/${viewDoc?.link}`, "_blank")
        }
    }, [isSuccess, viewDoc?.link])
    
    const [toggleModals, setToggleModals] = useState({
        openSendRequest: false,
        openRequestSent: false,
        openCodeModal: false,
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

    const toggleCodeModal = useCallback((item: RequestDocumentParams | null = null) => {
        setToggleModals((prev) => ({
            ...prev,
            item: item,
            openCodeModal: !toggleModals.openCodeModal,
        }))
    },[toggleModals.openCodeModal])

    const columns = [
        {
            header: "Document Name",
            accessorKey: "docname",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as DocumentData
                return (
                    <div className="whitespace-nowrap">{item?.docname}</div>
                )
            }
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: ({ row }: { row: any; }) => {
                const item = row?.original as DocumentData
                return (
                    <div className="whitespace-nowrap">{item?.description}</div>
                )
            }
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ ...rest }: any) => {

                const hasPermission = rest.parentData?.has_permission === 1;

                return (
                    <button
                        type="button"
                        disabled={!hasPermission}
                        className="text-xs text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                        onClick={() => setDocumentFilters((prev) => ({
                            ...prev,
                            user_id: talent?.user_id,
                            document_id: rest?.row?.original?.document_id,
                            component: "view"
                        }))}
                    >
                        View
                    </button>
                );
            }
        },
    ];
    return (
        <Fragment>
            <RenderIf condition={!isLoading}>
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
                                checkPermission={(groupItem) => groupItem.has_permission === 1}
                                parentAccessor={(item) => ({ has_permission: item.has_permission })}
                                renderHeader={(groupItem) => {
                                    const item = groupItem.data[0];
                                    return (
                                        <Fragment>
                                            <RenderIf condition={groupItem?.has_permission === -1}>
                                                <button type="button" className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200" onClick={() => toggleSendRequest({ docat_id: item?.docat_id, user_id: item?.user_id })}>
                                                    <Icon icon="ri:lock-2-line" className="size-4 text-warning-500" />
                                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Request Access</span>
                                                </button>
                                            </RenderIf>
                                            <RenderIf condition={groupItem?.has_permission === 0}>
                                                <div className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200">
                                                    <Icon icon="ri:send-plane-line" className="size-4 text-blue-500" />
                                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Request Sent</span>
                                                </div>
                                            </RenderIf>
                                            <RenderIf condition={groupItem?.has_permission === 1}>
                                                <div className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200">
                                                    <Icon icon="ri:lock-unlock-line" className="size-4 text-success-500" />
                                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Access Granted</span>
                                                </div>
                                            </RenderIf>
                                            <RenderIf condition={groupItem?.has_permission === 2}>
                                                <div className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200">
                                                    <Icon icon="ri:lock-2-line" className="size-4 text-error-600" />
                                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Access Denied</span>
                                                </div>
                                            </RenderIf>
                                            <RenderIf condition={groupItem?.has_permission === 3}>
                                                <button type="button" className="flex py-1 pr-2 pl-1 items-end gap-1 bg-white rounded-md border border-gray-200" onClick={() => toggleCodeModal({ docat_id: item?.docat_id, user_id: item?.user_id })}>
                                                    <Icon icon="ri:lock-password-line" className="size-4 text-warning-600" />
                                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Enter Code</span>
                                                </button>
                                            </RenderIf>
                                        </Fragment>
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
                <AccessDocumentCode isOpen={toggleModals.openCodeModal} onClose={toggleCodeModal} params={toggleModals.item as RequestDocumentParams} onSuccess={() => toggleCodeModal(null)} />
                <DocumentAccessModal isOpen={toggleModals.openSendRequest} onClose={toggleSendRequest} params={toggleModals.item as RequestDocumentParams} onSuccess={() => {
                    toggleSendRequest(null);
                    toggleRequestSent()
                }} />
                <DocumentRequestSendModal isOpen={toggleModals.openRequestSent} onClose={toggleRequestSent} />
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}