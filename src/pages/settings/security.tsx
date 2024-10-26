import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { setItem } from "@/utils/localStorage"
import { loginSchema } from "@/validations/auth"
import { useGetAccount } from "@/services/hooks/queries"
import { tabVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { updatePasswordSchema } from "@/validations/settings"
import { useUpdateAccount, useUpdateEmail, useUpdatePassword } from "@/services/hooks/mutations"
import { Button, ContentDivider, InputField, RenderIf, Toggle } from "@/components/core"
import { Dialog, DialogPanel, DialogTitle, Field, Fieldset, Label, Legend, Radio, RadioGroup } from "@headlessui/react"
import { cn } from "@/libs/cn"

const channels = [
    { label: "Email", value: "email" },
    { label: "Phone Number", value: "phone" }
]

export const SettingsSecurityPage: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const { mutate: updateAccount } = useUpdateAccount(message, () => setMessage(""))
    const { data, refetch } = useGetAccount({ enabled: false })
    const { mutate: updateEmail, isPending: isUpdatingEmail } = useUpdateEmail(() => {
        setItem("change-email", "change-email")
        navigate("/settings/change-email")
    })

    const [toggleModals, setToggleModals] = useState({
        openChangeEmail: false,
        openChangePassword: false,
        openVerifyPhone: false
    })

    const toggleChangeEmail = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openChangeEmail: !toggleModals.openChangeEmail,
      }))
    }, [toggleModals.openChangeEmail])

    const toggleChangePassword = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openChangePassword: !toggleModals.openChangePassword,
      }))
    }, [toggleModals.openChangePassword])

    const toggleVerifyPhone = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openVerifyPhone: !toggleModals.openVerifyPhone,
      }))
    }, [toggleModals.openVerifyPhone])

    const { handleSubmit, isValid, register, values } = useFormikWrapper({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: () => {
            updateEmail(values)
        }
    })

    const { errors, handleSubmit: handlePasswordSubmit, isValid: isPasswordValid, register: registerPassword, setFieldValue, values: passwordValues } = useFormikWrapper({
        initialValues: {
            password: "",
            otp_channel: "" as "email" | "phone"
        },
        validationSchema: updatePasswordSchema,
        onSubmit: () => {
            updatePassword(passwordValues)
        }
    })
    
    const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword(`Code has been sent your ${channels?.find((item) => item?.value === passwordValues?.otp_channel)?.label?.toLowerCase()}`, () => {
        setItem("change-password", channels?.find((item) => item?.value === passwordValues?.otp_channel)?.label?.toLowerCase())
        navigate("/settings/change-password")
    })

    const toggle2fa = () => {
        setMessage(`2Factor Authentication ${data?.twofactor?.is_enabled === 1 ? "disabled" : "enabled"} successfully!`)
        updateAccount(
            {
                twofactor: {
                    is_enabled: data?.twofactor?.is_enabled === 1 ? "0" : "1",
                }
            }
        )
    }

    const toggle2faChannel = () => {
        updateAccount(
            {
                twofactor: {
                    is_enabled: "1",
                    channel: data?.twofactor?.channel === "email" ? "phone" : "email"
                }
            }
        )
    }

    useEffect(() => {
        if (data === undefined) {
            refetch()
        }
    },[])

    return (
        <motion.div initial={tabVariants.initial} animate={tabVariants.final} exit={tabVariants.initial} className="flex flex-col gap-6 lg:pb-28">
            <div className="grid gap-2">
                <h1 className="font-medium text-lg text-gray-900">Security</h1>
                <p className="text-base text-gray-400">Edit and update security details to get your account secured</p>
            </div>
            <ContentDivider />
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-6">
                    <div className="grid gap-2 flex-1">
                        <h2 className="font-medium text-sm text-gray-900">Enable 2Factor Authentication</h2>
                        <p className="text-sm text-gray-500">Agree to receive OTP Authentication with your registered email address and phone number securely</p>
                    </div>
                    <Toggle checked={data?.twofactor?.is_enabled === 1} onChange={() => toggle2fa()} />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-medium text-sm text-gray-900">Choose OTP Channel</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Email ({data?.email}) <span className="text-primary-500">VERIFIED</span></span>
                            <Toggle checked={data?.twofactor?.channel === "email"} onChange={() => toggle2faChannel()} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <span className="text-sm text-gray-500">
                                    Phone Number (+{data?.phone_prefix}{data?.phone_number}) <span className={cn(data?.phonenumber_verified ? "text-primary-500" : "text-error-600")}>{data?.phonenumber_verified ? "VERIFIED" : "UNVERIFIED"}</span>
                                </span>
                                <button type="button" onClick={() => toggleVerifyPhone()} className="bg-gray-50 border border-gray-300 rounded-full py-1 px-5 text-sm font-medium text-gray-700">Verify</button>
                            </div>
                            <Toggle checked={data?.twofactor?.channel === "phone"} onChange={() => toggle2faChannel()} />
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="flex items-center gap-6" onClick={toggleChangeEmail}>
                <div className="grid gap-2 text-left flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Email Address</h2>
                    <p className="text-sm text-gray-500">Update your email address</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </button>
            <button type="button" className="flex items-center gap-6" onClick={toggleChangePassword}>
                <div className="grid gap-2 text-left flex-1">
                    <h2 className="font-medium text-sm text-gray-900">Password</h2>
                    <p className="text-sm text-gray-500">Update your password</p>
                </div>
                <Icon icon="ri:arrow-right-s-line" className="size-6 text-gray-400" />
            </button>
            <Dialog open={toggleModals.openChangeEmail} as="div" className="relative z-10 focus:outline-none" onClose={toggleChangeEmail}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel as="form" onSubmit={handleSubmit} transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-1 py-4 pl-5 pr-4 border-b border-b-gray-200">
                                <div className="flex items-center w-full gap-2 justify-between">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Request Change of Email
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleChangeEmail}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Codes will be sent to your email and phone number. Provide password to proceed.
                                </p>
                            </div>
                            <div className="grid gap-5 p-4">
                                <InputField label="Password" placeholder="• • • • • • • • • •" size="40" type="password" {...register("password")} required />
                                <InputField label="New Email" placeholder="• • • • • • • • • •" size="40" type="text" {...register("email")} required />
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" disabled={isUpdatingEmail} block onClick={toggleChangeEmail}>Cancel</Button>
                                <Button type="submit" theme="primary" variant="filled" size="36" loading={isUpdatingEmail} disabled={isUpdatingEmail || !isValid} block>Yes, Proceed</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={toggleModals.openChangePassword} as="div" className="relative z-10 focus:outline-none" onClose={toggleChangePassword}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel as="form" onSubmit={handlePasswordSubmit} transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col items-center gap-1 py-4 pl-5 pr-4 border-b border-b-gray-200">
                                <div className="flex items-center w-full gap-2 justify-between">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Request Change of Password
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleChangePassword}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Codes will be sent to your email and phone number. Provide password to proceed.
                                </p>
                            </div>
                            <div className="grid gap-5 p-4">
                                <InputField label="Password" placeholder="• • • • • • • • • •" size="40" type="password" {...registerPassword("password")} required />
                                <Fieldset className="grid gap-5">
                                    <Legend className="font-medium text-gray-900 text-sm">Receive OTP via</Legend>
                                    <RadioGroup name="value" value={passwordValues.otp_channel} onChange={(v) => setFieldValue("otp_channel", v, true)} className="grid gap-2.5">
                                    {channels.map((plan) => (
                                        <Field key={plan.value} className="flex items-center gap-6">
                                            <Label className="flex-1 text-gray-500 text-sm">{plan.label}</Label>
                                            <Radio value={plan.value} className="group">
                                                <span className="size-5 grid place-content-center rounded-full bg-white border border-gray-200 group-data-[checked]:border-primary-700 group-data-[checked]:bg-primary-500 transition duration-500 ease-out" style={{ boxShadow: "0px 2px 2px 0px rgba(27, 28, 29, 0.12) inset" }}>
                                                    <div className="hidden group-data-[checked]:grid size-2 bg-white rounded-full shadow-[0px -2px 3px 0px rgba(207, 209, 211, 1) inset]" style={{ boxShadow: "0px 2px 2px 0px rgba(27, 28, 29, 0.12)" }} />
                                                </span>
                                            </Radio>
                                        </Field>
                                    ))}
                                    </RadioGroup>
                                    <RenderIf condition={!!errors?.otp_channel}>
                                        <span className="neesilo-input--error">{errors?.otp_channel}</span>
                                    </RenderIf>
                                </Fieldset>
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" block disabled={isUpdatingPassword} onClick={toggleChangePassword}>Cancel</Button>
                                <Button type="submit" theme="primary" variant="filled" size="36" block disabled={!isPasswordValid || isUpdatingPassword} loading={isUpdatingPassword}>Yes, Proceed</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog open={toggleModals.openVerifyPhone} as="div" className="relative z-10 focus:outline-none" onClose={toggleVerifyPhone}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                    <div className="flex min-h-full items-end md:items-center justify-center p-4">
                        <DialogPanel as="form" onSubmit={handleSubmit} transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                            <div className="flex flex-col gap-1 py-4 pl-5 pr-4 border-b border-b-gray-200">
                                <div className="flex items-center w-full gap-2 justify-between">
                                    <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                        Verify Phone Number
                                    </DialogTitle>
                                    <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={toggleVerifyPhone}>
                                        <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Code will be sent to +{data?.phone_prefix}{data?.phone_number}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                <Button type="button" theme="neutral" variant="stroke" size="36" disabled={isUpdatingEmail} block onClick={toggleVerifyPhone}>Cancel</Button>
                                <Button type="submit" theme="primary" variant="filled" size="36" loading={isUpdatingEmail} disabled={isUpdatingEmail} block>Ok, Proceed</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </motion.div>
    )
}