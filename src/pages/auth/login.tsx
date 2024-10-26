import React, { Fragment, useEffect, useState } from "react"
import logo from "@/assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { getItem, removeItem } from "@/utils/localStorage"
import { routeVariants } from "@/constants/animateVariants"
import { Button, InputField, OtpInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { loginSchema } from "@/validations/auth"
import { use2FaLogin, useLogin } from "@/services/hooks/mutations"
import type { TwoFaLogin, User } from "@/types/auth"

export const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState("login")
    // eslint-disable-next-line no-unused-vars
    const [_, setChannel] = useState("login")
    const [otpError, setOtpError] = useState("")
    const newPass = getItem<string>("newPass")
    const [otp, setOtp] = useState<string>("")
    const [countdown, setCountdown] = useState<number>(300)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const { mutate: twoFaLogin, isPending: isAuthenticating, error, isError } = use2FaLogin((data) => handleSuccessfulLogin(data as User))
    const { mutateAsync: login, isPending } = useLogin((data) => {
        handleSuccessfulLogin(data as User)
        if ((data as TwoFaLogin)?.action) {
            setCountdown(300)
            setChannel((data as TwoFaLogin)?.channel[0])
            setStep("2fa")
        }
    })

    const handleSuccessfulLogin = (data: User) => {
        if (data?.twofactor?.is_enabled === 0) {
            navigate("/")
        }
        if (data?.onboarding_stage) {
            if (Object.values(data?.onboarding_stage)?.some((item) => item === false)) {
                navigate("/onboarding")
            } else {
                proceed()
            }
        }
    }

    useEffect(() => {
        let interval: any;
        if (isButtonDisabled) {
          interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [isButtonDisabled]);
    
    useEffect(() => {
        if (countdown <= 0) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          setCountdown(300); // Reset countdown (optional if button is not disabled again)
        }
    }, [countdown]);

    const loginForm = useFormikWrapper({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: () => {
            login(loginForm.values)
        }
    })

    const handleResendClick = () => {
        login(loginForm.values).then(() => {
            setIsButtonDisabled(true);
            setCountdown(300); // Reset the timer
        })
    };

    const formatCountdown = (countdown: number) => {
        const minutes = Math.floor(countdown / 60).toString().padStart(2, "0");
        const seconds = (countdown % 60).toString().padStart(2, "0");
        return `${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        if (isError) {
            setOtpError(error?.response?.data?.msg)
            setOtp("")
        }
    },[isError])

    useEffect(() => {
        if (otp.length > 0) {
            setOtpError("")
        }
    },[otp.length])

    const proceed = () => {
        removeItem("newPass")
        setCountdown(300)
        setStep("2fa")
    }

    const handle2Fa = () => {
        twoFaLogin({ code: otp })
    }

    return (
        <Fragment>
            <AnimatePresence mode="popLayout">
                {
                    step === "login" && (
                    <motion.form onSubmit={loginForm.handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <img src={logo} alt="neesilo_logo" className="mx-auto" />
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">Log into your account</h1>
                            <p className="font-medium text-base text-gray-500 text-center">{!newPass && "Welcome back! "}Please enter your details to login</p>
                        </div>
                        <div className="grid gap-4 w-full">
                            <InputField label="Email Address" type="text" size="40" placeholder="Enter your email address" {...loginForm.register("email")} />
                            <div className="grid gap-1">
                                <InputField label="Password" type="password" size="40" placeholder="Enter your password" iconRight="ri:key-line" {...loginForm.register("password")} />
                                <div className="flex items-center justify-end py-0.5">
                                    <Link to="/auth/forgot-password" className="font-medium text-xs text-primary-500">Forgot Password</Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <Button type="submit" theme="primary" variant="filled" size="40" loading={isPending} disabled={isPending || !loginForm.isValid} block>Login</Button>
                            <Button type="button" theme="primary" variant="ghost" size="40" onClick={() => navigate("/auth/welcome")} block>Sign up</Button>
                        </div>
                    </motion.form>
                    )
                }
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {
                    step === "2fa" && (
                    <motion.div initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 p-4 w-full md:max-w-96">
                        <img src={logo} alt="neesilo_logo" className="mx-auto" />
                        <div className="grid gap-2">
                            <h1 className="font-semibold text-xl text-gray-900 text-center">2-Factor Authentication</h1>
                            <p className="font-medium text-base text-gray-500 text-center">Please input the OPT code that was sent to your email address</p>
                        </div>
                        <div className="grid gap-4 w-full">
                            <OtpInput value={otp} onChange={(v: any) => setOtp(v)} error={otpError} />
                            <Button type="button" theme="neutral" variant="ghost" size="40" disabled={isAuthenticating || isPending || isButtonDisabled} loading={isPending} onClick={handleResendClick} block>
                                <span className="text-gray-500">Resend { isButtonDisabled && `code (${formatCountdown(countdown)})` }</span>
                            </Button>
                        </div>
                        <Button type="button" theme="primary" variant="filled" size="40" disabled={isAuthenticating || (otp.length < 4)} loading={isAuthenticating} onClick={() => handle2Fa()} block>Continue</Button>
                    </motion.div>
                    )
                }
            </AnimatePresence>
        </Fragment>
    )
}