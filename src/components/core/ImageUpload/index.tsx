import React, { useEffect, useRef, useState } from "react";
import { errorToast } from "@/utils/createToast";
import userAvatar from "@/assets/user_avatar.svg";
import companyAvatar from "@/assets/company_avatar.svg";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { imageUploadSchema } from "@/validations/onboarding";
import { Avatar, Button, RenderIf } from "@/components/core";

interface ImageUploadProps {
    /**
     * Shows the size of avatar component to render
     */
    size: "64" | "56";
    /**
     * Shows the image to render in the avatar component
     */
    image?: string | null;
    /**
     * Shows the title text to render
     */
    titleText?: string;
    /**
     * Shows the subtitle text to render
     */
    subtitleText?: string;
    /**
     * Wether or not to render action buttons
     */
    showActions?: boolean;
    /**
     * Shows the type of placeholder image to render
     */
    type: "avatar" | "company";
    /**
     * Function to set the file
     */
    // eslint-disable-next-line no-unused-vars
    setFile?: (v: File | unknown) => void;
    /**
     * Function to reset state
     */
    onReset?: () => void;
    /**
     * Arbitrary params
     */
    [x: PropertyKey]: unknown;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ image = null, onReset, showActions = false, setFile, size, subtitleText = "Maximum image size of 300KB", titleText = "Upload Image", type }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [defaultImg, setDefaultImg] = useState(image)

    const { errors, isValid, isValidating, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            file: "" as unknown
        },
        validateOnChange: true,
        validationSchema: imageUploadSchema,
        onSubmit: () => {}
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue("file", file, true)
        }
    }

    const removePhoto = () => {
        setDefaultImg(image)
        onReset?.()
    }

    useEffect(() => {
        if (!isValid && !isValidating) {
            errorToast({ param: { message: errors.file }, variant: "light" })
        }
        if (isValid && !isValidating && !!(values.file as File).type) {
            const blobUrl = URL.createObjectURL(values.file as File);
            setDefaultImg(blobUrl);
            setFile?.(values.file as File)
        }
    },[errors.file, isValid, isValidating, values.file]) // Do not tamper with this to avoid rerenders
    return (
        <div className="flex items-start gap-5">
            <Avatar size={size} image={defaultImg ?? (type === "avatar" ? userAvatar : companyAvatar)} />
            <input ref={inputRef} name="file" id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
            <div className="flex flex-col gap-3">
                <div className="grid gap-1">
                    <h5 className="font-medium text-base text-gray-900">{titleText}</h5>
                    <p className="text-sm text-gray-500">{subtitleText}</p>
                </div>
                <RenderIf condition={showActions}>
                    <RenderIf condition={defaultImg === null}>
                        <div className="flex items-center gap-3">
                            <Button type="button" theme="neutral" variant="stroke" size="32" onClick={() => inputRef?.current?.click()}>Upload</Button>
                        </div>
                    </RenderIf>
                    <RenderIf condition={defaultImg !== null}>
                        <div className="flex items-center gap-3">
                            <RenderIf condition={defaultImg !== image}>
                                <Button type="button" theme="error" variant="stroke" size="32" onClick={() => removePhoto()}>Remove</Button>
                            </RenderIf>
                            <Button type="button" theme="neutral" variant="stroke" size="32" onClick={() => inputRef?.current?.click()}>Change Photo</Button>
                        </div>
                    </RenderIf>
                </RenderIf>
            </div>
        </div>
    )
}