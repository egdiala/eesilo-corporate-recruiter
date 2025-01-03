import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { Button, ContentDivider } from "@/components/core";
import { loadStripe, type StripeElements } from "@stripe/stripe-js";
import { getItem } from "@/utils/localStorage";
import { errorToast } from "@/utils/createToast";

interface AddPaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const appSecret = getItem("appSecret") as string
const stripePromise = loadStripe(appSecret);

const AddPaymentMethod: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const {error: submitError} = await (elements as StripeElements).submit();
        if (submitError) {
            setLoading(false);
            errorToast({ param: submitError, variant: "light" })
            return;
        }

        // Create the SetupIntent and obtain clientSecret
        const res = await fetch("/create-intent", {
            method: "POST",
        });

        const {client_secret: clientSecret} = await res.json();

        // Confirm the SetupIntent using the details collected by the Payment Element
        const {error} = await stripe.confirmSetup({
            elements: elements as StripeElements,
            clientSecret,
            confirmParams: {
                return_url: "https://example.com/complete",
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the setup. Show the error to your customer (for example, payment details incomplete)
            setLoading(false);
            errorToast({ param: error, variant: "light" })
        } else {
            setLoading(false);
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
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
                                    Upcoming Interviews
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
                            <PaymentElement />
                        </div>
                        <div className="flex items-center gap-6">
                            <Button type="button" theme="neutral" variant="stroke" size="40" onClick={onClose} block>Cancel</Button>
                            <Button type="submit" theme="primary" variant="filled" size="40" disabled={!stripe || loading} loading={loading} block>Done</Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose }) => {
    return (
        <Elements stripe={stripePromise} options={{
            mode: "setup",
            currency: "usd",
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
    )
}
