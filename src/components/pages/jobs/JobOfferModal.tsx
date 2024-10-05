import React, { ChangeEvent, DragEvent } from "react";
import { Icon } from "@iconify/react";
import { Button, RenderIf } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import filePDF from "@/assets/file_pdf.svg";
import { useFileSize } from "@/hooks/useFileSize";

interface JobOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JobOfferModal: React.FC<JobOfferModalProps> = ({ isOpen, onClose }) => {
    const { setFieldError, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            files: null as File | null
        },
        onSubmit: () => {
            
        }
    })
    const prepareDoc = async(file: File) => {
        await setFieldValue("files", file, true);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        const file = files[0];
        if (file) {
            if (file.type === "text/pdf" || file.name.endsWith(".pdf")) {
                prepareDoc(file);
                setFieldError("files", undefined)
            } else {
                setFieldError("files", "Please upload a PDF file.");
            }
        }
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        const file = files?.[0];
        if (file) {
            if (file.type === "text/pdf" || file.name.endsWith(".pdf")) {
                prepareDoc(file);
                setFieldError("files", undefined) // Clear any previous errors
            } else {
                setFieldError("files", "Please upload a PDF file.");
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel transition className="flex flex-col w-full max-w-[24.5rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 p-4 justify-between border-b border-b-gray-200">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                    Make Job Offer
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={onClose}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Upload a pdf of the offer details</p>
                        </div>
                        <div className="grid gap-4 p-4">
                            <label onDrop={handleDrop} onDragOver={handleDragOver} htmlFor="files" className="grid place-content-center p-8 h-52 gap-4 rounded-xl cursor-pointer hover:bg-gray-100 border border-dashed border-primary-500 hover:border-gray-300 transition-all ease duration-500">
                                <div className="grid gap-5 justify-items-center">
                                    <Icon icon="ri:upload-cloud-2-line" className="size-6 text-gray-500" />
                                    <div className="grid gap-1 justify-items-center">
                                        <h4 className="font-medium text-sm text-gray-900">Choose a file or drag & drop it here.</h4>
                                        <p className="text-xs text-gray-400">PDF up to 10 MB.</p>
                                    </div>
                                </div>
                                <input id="files" type="file" accept=".pdf" name="files" className="hidden" onChange={(e) => handleFileChange(e)} />
                            </label>
                            <RenderIf condition={values?.files !== null}>
                                <div className="flex flex-col gap-4 border border-gray-200 rounded-xl py-4 pr-4 pl-3.5">
                                    <div className="flex items-start gap-3">
                                        <img src={filePDF} className="size-10" />
                                        <div className="flex-1 grid gap-1">
                                            <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{values?.files?.name}</h4>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-gray-500">{useFileSize(values?.files?.size || 0)}</span>
                                            </div>
                                        </div>
                                        <button type="button" className="p-px" onClick={() => setFieldValue("files", null)}>
                                            <Icon icon="ri:delete-bin-line" className="size-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </RenderIf>
                        </div>
                        <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                            <Button type="button" theme="neutral" variant="stroke" size="36" onClick={onClose} block>Cancel</Button>
                            <Button type="button" theme="primary" variant="filled" size="36" block>Submit Offer</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}