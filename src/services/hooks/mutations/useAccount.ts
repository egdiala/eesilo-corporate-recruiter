import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { updateAccount } from "@/services/apis/account";

// eslint-disable-next-line no-unused-vars
export const useUpdateAccount = (msg?: string, fn?: () => void) => {
  return useMutation({
    mutationFn: updateAccount,
      onSuccess: (response) => {
        console.log(response)
        successToast({ param: { }, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};