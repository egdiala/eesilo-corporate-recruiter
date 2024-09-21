import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { tabVariants } from "@/constants/animateVariants"
import { Button, ContentDivider, InputField, RenderIf, SelectInput } from "@/components/core"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useGetStaffAdmins } from "@/services/hooks/queries"
import { useCreateStaffAdmin, useDeleteStaffAdmin } from "@/services/hooks/mutations"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { createStaffAdminSchema } from "@/validations/settings"
import { Loader } from "@/components/core/Button/Loader"
import { FetchedStaffAdmin } from "@/types/settings"

const accessLevel = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
]

export const StaffAccessControl: React.FC = () => {
    const { data: staffs, isFetching: fetchingStaffs } = useGetStaffAdmins()
    const { mutate: createAdmin, isPending: isCreating } = useCreateStaffAdmin(() => toggleCreateStaff())
    const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteStaffAdmin(() => toggleDeleteStaff(null))
    const [toggleModals, setToggleModals] = useState({
        openCreateStaff: false,
        openDeleteStaff: false,
        activeStaff: null as FetchedStaffAdmin | null
    })

    const { handleSubmit, isValid, register, resetForm, values } = useFormikWrapper({
        initialValues: {
            name: "",
            email: "",
            job_title: "",
            access_sensitive_data: "" as "0" | "1"
        },
        validationSchema: createStaffAdminSchema,
        onSubmit: () => {
            createAdmin(values)
        }
    })

    const toggleCreateStaff = useCallback(() => {
        setToggleModals((prev) => ({
            ...prev,
            openCreateStaff: !toggleModals.openCreateStaff,
        }))
        resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toggleModals.openCreateStaff])

    const toggleDeleteStaff = useCallback((staff: FetchedStaffAdmin | null) => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteStaff: !toggleModals.openDeleteStaff,
        activeStaff: staff
      }))
    },[toggleModals.openDeleteStaff])

    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Staffs and Access Control</h1>
                <p className="text-base text-gray-400">Create and grant access to members of staff</p>
            </div>
            <ContentDivider />
            <RenderIf condition={!fetchingStaffs}>
                <RenderIf condition={staffs?.length! > 0}>
                    <div className="flex flex-col gap-5">
                        {
                            staffs?.map((staff) =>
                                <div key={staff?.user_id} className="grid gap-2.5 p-2.5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <h2 className="font-medium text-base text-gray-900">{staff?.name}</h2>
                                            <p className="font-medium text-sm text-gray-600">{staff?.email}</p>
                                            <span className="font-medium text-sm text-gray-600">{staff?.admin_data?.myjob_role}</span>
                                        </div>
                                        <button type="button" onClick={() => toggleDeleteStaff(staff)} className="group">
                                            <Icon icon="ri:delete-bin-line" className="size-6 text-error-600 group-hover:text-error-500 transition-all duration-500 ease-out" />
                                        </button>
                                    </div>
                                    <div className="flex items-start gap-1 py-0.5">
                                        <Icon icon="ri:error-warning-fill" className="size-4 text-gray-400" />
                                        <div className="grid flex-1 text-xs text-gray-500">
                                            This job role can:
                                            <ul className="list-disc list-inside">
                                                <li>{staff?.admin_data?.myaccess_sensitive === 0 ? "Not request" : "Request"} and access sensitive documents</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </RenderIf>
                <button type="button" onClick={toggleCreateStaff} className="grid gap-3 py-3.5 border border-dashed border-primary-500 rounded-[0.625rem]">
                    <div className="flex flex-col gap-3 items-center w-full mx-auto max-w-64">
                        <Icon icon="ri:add-circle-line" className="size-6 text-primary-500" />
                        <p className="text-sm text-gray-500 text-center">Grant a new user access control over your account</p>
                    </div>
                </button>
            </RenderIf>
            <RenderIf condition={fetchingStaffs}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
            <Dialog open={toggleModals.openDeleteStaff} as="div" className="relative z-10 focus:outline-none" onClose={() => toggleDeleteStaff(null)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-4 p-5">
                                <div className="grid place-content-center bg-error-50 rounded-[0.625rem] p-2">
                                    <Icon icon="ri:error-warning-fill" className="text-error-500 size-6" />
                                </div>
                                <div className="grid gap-1 text-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Remove Staff
                                    </DialogTitle>
                                    <p className="text-sm text-gray-500">
                                        This staff will be removed and all access revoked.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" disabled={isDeleting} block onClick={() => toggleDeleteStaff(null)}>Dismiss</Button>
                                <Button type="button" theme="primary" variant="filled" size="36" disabled={isDeleting} loading={isDeleting} onClick={() => deleteAdmin(toggleModals?.activeStaff?.user_id as string)} block>Yes, Remove Staff</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={toggleModals.openCreateStaff} as="div" className="relative z-10 focus:outline-none" onClose={toggleCreateStaff}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-[30rem] rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col gap-1 py-4 pr-4 pl-5 border-b border-b-gray-200">
                                <div className="flex items-center">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Create Staff and Access
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleCreateStaff}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Meet with your potential employee.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 p-4">
                                    <InputField label="Name" placeholder="Name" size="40" type="text" {...register("name")} required />
                                    <InputField label="Email" placeholder="Email" size="40" type="text" {...register("email")} required />
                                    <InputField label="Role" placeholder="Role" size="40" type="text" {...register("job_title")} required />
                                    <SelectInput label="Can request and access sensitive documents from employees?" options={accessLevel} {...register("access_sensitive_data")} required />
                                </div>
                                <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                    <Button type="button" theme="neutral" variant="stroke" size="40" block disabled={isCreating} onClick={toggleCreateStaff}>Cancel</Button>
                                    <Button type="submit" theme="primary" variant="filled" size="40" disabled={!isValid || isCreating} loading={isCreating} block>Create</Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}