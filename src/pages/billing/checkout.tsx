import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/core";
import { capitalizeWords } from "@/utils/capitalize";
import { getItem, removeItem } from "@/utils/localStorage";
import { pageVariants } from "@/constants/animateVariants";
import { errorToast, successToast } from "@/utils/createToast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCompleteSubscription } from "@/services/hooks/mutations";
import { loadStripe, type StripeCardElement } from "@stripe/stripe-js";
import { Elements, useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { getAdminData } from "@/utils/authUtil";

interface BillingData {
    appSecret: string;
    clientSecret: string;
    transactionRef: string;
}

interface CheckoutFormProps {
    clientSecret: string;
    transactionRef: string;
    plan: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, transactionRef, plan }) => {
    const navigate = useNavigate()
    const user = getAdminData()
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { mutate: finalize, isPending: isFinalizing } = useCompleteSubscription(() => {
        successToast({ param: null, msg: `Neesilo ${capitalizeWords(plan)} Subscription Payment Successful!`, size: "36" })
        removeItem("billing_data")
        navigate("/billings")
    })


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true)
        event.preventDefault();

        if (!stripe || !elements) {
            setIsSubmitting(false)
            errorToast({ param: { message: "Stripe is not loaded yet." }, variant: "light" })
            return;
        }
        // Confirm payment with the client secret
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
                billing_details: {
                    name: user?.name, // Replace with dynamic name if needed
                },
            }
        });
        
        if (result.error) {
            setIsSubmitting(false)
            errorToast({ param: { message: `Payment failed: ${result.error.message}` }, variant: "light" })
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            setIsSubmitting(false)
            finalize({ transaction_ref: transactionRef })
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <CardElement className="neesilo-input neesilo-input--40 neesilo-input--border" />
            <Button type="submit" disabled={!stripe || isFinalizing} loading={isSubmitting || isFinalizing} theme="primary" variant="filled" size="40" block>
                Pay
            </Button>
        </form>
    );
}

const data = getItem("billing_data")
const billingData = JSON.parse(data as string) as BillingData


const stripePromise = loadStripe(billingData?.appSecret as string);


export default function CheckoutFormPage () {
    const [searchParams] = useSearchParams()

    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            <div className="flex flex-col gap-0 bg-white rounded-2xl p-4 lg:p-8">
                <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
                    <h1 className="text-2xl font-semibold capitalize">
                        <span className="text-lg font-medium text-gray-600">{searchParams.get("plan")} — </span>${searchParams.get("price")}
                    </h1>
                    <Elements stripe={stripePromise} options={{
                        clientSecret: billingData?.clientSecret as string,
                        appearance: {
                            theme: "stripe",
                            variables: {
                                colorPrimary: "#00B75B",
                                fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                                colorDanger: "#F04438"
                            }
                        }
                    }}>
                        <CheckoutForm clientSecret={billingData?.clientSecret as string} plan={searchParams.get("plan") as string} transactionRef={billingData?.transactionRef as string} />
                    </Elements>
                </div>
            </div>
        </motion.div>
    )
}