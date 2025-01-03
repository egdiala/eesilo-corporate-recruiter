import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_SAVED_CARDS, GET_SUBSCRIPTION } from "@/constants/queryKeys";
import { completeSubscription, initSaveCard, initSubscription } from "@/services/apis/subscription";
import type { InitSubscriptionResponse } from "@/types/subscription";
import { setItem } from "@/utils/localStorage";

// eslint-disable-next-line no-unused-vars
export const useInitSubscription = (fn?: (value: InitSubscriptionResponse) => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: initSubscription,
    onSuccess: (response) => {
      setItem("billing_data", JSON.stringify({
        appSecret: response?.data?.app_secret,
        clientSecret: response?.data?.client_secret,
        transactionRef: response?.data?.transaction_ref,
      }))
        queryClient.invalidateQueries({ queryKey: [GET_SUBSCRIPTION] })
        fn?.(response?.data)
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

export const useCompleteSubscription = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: completeSubscription,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SUBSCRIPTION] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

export const useInitSaveCard = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: initSaveCard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SAVED_CARDS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};