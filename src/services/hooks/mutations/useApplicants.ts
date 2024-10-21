import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_SHORTLISTED, GET_SHORTLISTED_CANDIDATE, GET_TALENT } from "@/constants/queryKeys";
import { removeShortlisted, requestDocumentAccess, shortlistCandidate, uploadOfferLetter } from "@/services/apis/applicants";
import { Dispatch, SetStateAction } from "react";

export const useShortlistApplicant = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: shortlistCandidate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED] })
        queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED_CANDIDATE] })
        successToast({ param: null, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

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

export const useUploadOfferLetter = (setProgress: Dispatch<SetStateAction<number>>, fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadOfferLetter,
        onMutate: () => {
          setProgress(0); // Reset progress when mutation starts
        },
        onSuccess: () => {
          setProgress(100);
          queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED] })
          queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED_CANDIDATE] })
          successToast({ param: null, msg: "Offer letter sent successfully!", size: "36" })
          fn?.()
        },
        onError: (err: any) => {
            errorToast({ param: err, variant: "light" })
        },
    });
};

export const useRequestDocumentAccess = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: requestDocumentAccess,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_TALENT] })
        queryClient.invalidateQueries({ queryKey: [GET_SHORTLISTED_CANDIDATE] })
        successToast({ param: null, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};