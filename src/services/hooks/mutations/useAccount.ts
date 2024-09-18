import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { updateAccount, uploadLogo } from "@/services/apis/account";
import { GET_ACCOUNT } from "@/constants/queryKeys";

// eslint-disable-next-line no-unused-vars
export const useUpdateAccount = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
      onSuccess: async () => {
        successToast({ param: null, msg, size: "36" })
        await queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useUploadLogo = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: uploadLogo,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};