import React, { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useStripe, useElements, Elements, CardElement } from "@stripe/react-stripe-js";
import { Button, ContentDivider, RenderIf } from "@/components/core";
import { loadStripe, type StripeCardElement } from "@stripe/stripe-js";
import { getItem, removeItem } from "@/utils/localStorage";
import { errorToast } from "@/utils/createToast";
import type { InitSubscriptionResponse } from "@/types/subscription";
import { getAdminData } from "@/utils/authUtil";
import { useGetSavedCard } from "@/services/hooks/queries";
import { Loader } from "@/components/core/Button/Loader";

interface AddPaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const cardSecretDetails = getItem("cardSecret") as string
const cardSecret = JSON.parse(cardSecretDetails) as Omit<InitSubscriptionResponse, "transaction_ref">
// const stripePromise = loadStripe(cardSecret?.app_secret);

const AddPaymentMethod: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
    const stripe = useStripe()
    const user = getAdminData()
    const elements = useElements()

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true)
        event.preventDefault();

        if (!stripe || !elements) {
            setIsSubmitting(false)
            errorToast({ param: { message: "Stripe is not loaded yet." }, variant: "light" })
            return;
        }
        // Confirm payment with the client secret
        const result = await stripe.confirmCardPayment(cardSecret?.client_secret, {
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
            removeItem("cardSecret")
            setIsSubmitting(false)
            onClose()
        }
    };

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                <div className="flex min-h-full items-end md:items-center justify-center p-4">
                    <DialogPanel as="form" onSubmit={handleSubmit} transition className="flex flex-col gap-6 w-full max-w-[49.75rem] p-4 lg:p-8 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                        <div className="flex flex-col gap-1 lg:p-4 justify-between">
                            <div className="flex items-center">
                                <DialogTitle as="h1" className="flex-1 text-lg font-medium text-gray-900">
                                    New Payment Method
                                </DialogTitle>
                                <button type="button" className="p-0.5 rounded-md hover:bg-gray-100 transition duration-500 ease-out" onClick={onClose}>
                                    <Icon icon="ri:close-line" className="size-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Add a new payment method to continue with the purchase of your plan.</p>
                        </div>
                        <div className="flex flex-col p-4 gap-4 border border-gray-200 rounded-xl">
                            <h2 className="font-medium text-base text-gray-900">Card Details</h2>
                            <ContentDivider />
                            <CardElement className="neesilo-input neesilo-input--40 neesilo-input--border" />
                        </div>
                        <div className="flex items-center gap-6">
                            <Button type="button" theme="neutral" variant="stroke" size="40" onClick={onClose} block>Cancel</Button>
                            <Button type="submit" theme="primary" variant="filled" size="40" disabled={!stripe || isSubmitting} loading={isSubmitting} block>Done</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
    const { data: details, isLoading } = useGetSavedCard<Omit<InitSubscriptionResponse, "transaction_ref">>({ component: "add-card" })
    const stripePromise = loadStripe(details?.app_secret || "");
    return (
        <Fragment>
            <RenderIf condition={!isLoading}>
                <Elements stripe={stripePromise} options={{
                    clientSecret: cardSecret?.client_secret as string,
                    appearance: {
                        theme: "stripe",
                        variables: {
                            colorPrimary: "#00B75B",
                            fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                            colorDanger: "#F04438"
                        }
                    }
                }}>
                    <AddPaymentMethod isOpen={isOpen} onClose={onClose} />
                </Elements>
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex w-full h-96 items-center justify-center">
                    <Loader className="spinner size-6 text-primary-500" />
                </div>  
            </RenderIf>
        </Fragment>
    )
}
