import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_ACCOUNT, GET_STAFF_ADMINS } from "@/constants/queryKeys";
import { confirmEmailUpdate, confirmPasswordUpdate, confirmPhoneUpdate, createStaffAdmin, deleteStaffAdmin, updateAccount, updateEmail, updatePassword, updateStaffAdmin, uploadLogo } from "@/services/apis/account";

// eslint-disable-next-line no-unused-vars
export const useUpdateAccount = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
      onSuccess: async () => {
        successToast({ param: null, msg, size: "36" })
        fn?.()
        await queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT] })
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmPhoneUpdate = (msg?: string, fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: confirmPhoneUpdate,
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

// eslint-disable-next-line no-unused-vars
export const useCreateStaffAdmin = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStaffAdmin,
      onSuccess: async () => {
        successToast({ param: null, msg: "Staff admin created successfully!", size: "36" })
        await queryClient.invalidateQueries({ queryKey: [GET_STAFF_ADMINS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useUpdateStaffAdmin = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateStaffAdmin,
      onSuccess: async () => {
        successToast({ param: null, msg: "Staff admin updated successfully!", size: "36" })
        await queryClient.invalidateQueries({ queryKey: [GET_STAFF_ADMINS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useDeleteStaffAdmin = (fn?: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteStaffAdmin,
      onSuccess: async () => {
        successToast({ param: null, msg: "Staff admin deleted successfully!", size: "36" })
        await queryClient.invalidateQueries({ queryKey: [GET_STAFF_ADMINS] })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useUpdateEmail = (fn?: () => void) => {
  return useMutation({
    mutationFn: updateEmail,
      onSuccess: async () => {
        successToast({ param: null, msg: "Code has been sent your email", size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmUpdateEmail = (fn?: () => void) => {
  return useMutation({
    mutationFn: confirmEmailUpdate,
      onSuccess: async () => {
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useUpdatePassword = (msg?: string, fn?: () => void) => {
  return useMutation({
    mutationFn: updatePassword,
      onSuccess: async () => {
        successToast({ param: null, msg, size: "36" })
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmUpdatePassword = (fn?: () => void) => {
  return useMutation({
    mutationFn: confirmPasswordUpdate,
      onSuccess: async () => {
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};