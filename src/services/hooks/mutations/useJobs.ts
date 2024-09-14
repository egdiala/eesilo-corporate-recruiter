import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createJob, updateJob } from "@/services/apis/jobs";

// eslint-disable-next-line no-unused-vars
export const useCreateJob = (msg?: string, fn?: () => void) => {
    return useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            successToast({ param: null, msg, size: "36" })
            fn?.()
        },
        onError: (err: any) => {
            errorToast({ param: err, variant: "light" })
        },
    });
};

// eslint-disable-next-line no-unused-vars
export const useUpdateJob = (msg?: string, fn?: () => void) => {
    return useMutation({
        mutationFn: updateJob,
        onSuccess: () => {
            successToast({ param: null, msg, size: "36" })
            fn?.()
        },
        onError: (err: any) => {
            errorToast({ param: err, variant: "light" })
        },
    });
};