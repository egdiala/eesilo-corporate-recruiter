import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_SHORTLISTED } from "@/constants/queryKeys";
import { removeShortlisted, shortlistCandidate } from "@/services/apis/applicants";

// eslint-disable-next-line no-unused-vars
export const useShortlistApplicant = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: shortlistCandidate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED] })
        successToast({ param: null, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useRemoveShortlisted = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeShortlisted,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED] })
        successToast({ param: null, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};