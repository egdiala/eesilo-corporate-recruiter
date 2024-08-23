import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { updateAccount } from "@/services/apis/account";
import { GET_ACCOUNT } from "@/constants/queryKeys";

// eslint-disable-next-line no-unused-vars
export const useUpdateAccount = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
      onSuccess: (response) => {
        console.log(response)
        queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT] })
        successToast({ param: {}, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};