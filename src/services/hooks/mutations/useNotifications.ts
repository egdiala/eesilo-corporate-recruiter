import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/utils/createToast";
import { GET_NOTIFICATIONS } from "@/constants/queryKeys";
import { readNotification, readNotifications } from "@/services/apis/notification";

export const useReadNotifications = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: readNotifications,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATIONS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

export const useReadNotification = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: readNotification,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATIONS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};