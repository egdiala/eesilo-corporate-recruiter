import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_SAVED_CARDS, GET_SUBSCRIPTION } from "@/constants/queryKeys";
import { completeSubscription, initSaveCard, initSubscription } from "@/services/apis/subscription";

export const useInitSubscription = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: initSubscription,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SUBSCRIPTION] })
        fn?.()
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