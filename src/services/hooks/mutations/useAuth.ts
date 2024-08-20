import { useMutation } from "@tanstack/react-query";
import { setItem } from "@/utils/localStorage";
import { axiosInit } from "@/services/axiosInit";
import { errorToast, successToast } from "@/utils/createToast";
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils";
import { confirmRegistrationLink, forgotPassword, login, register, setPassword } from "@/services/apis/auth";
import { User } from "@/types/auth";


function onLoginSuccess(responseData: any) {
  const { token, ...userData } = responseData;
  setItem(APP_TOKEN_STORAGE_KEY, token);
  setItem(APP_USERDATA_STORAGE_KEY, JSON.stringify(userData));
  axiosInit(token)
}

// eslint-disable-next-line no-unused-vars
export const useLogin = (fn?: (v: User) => void) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      onLoginSuccess(response?.data)
      successToast({ param: null, msg: "Logged in successfully" })
      fn?.(response?.data);
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useRegister = (fn?: (v: string) => void) => {
  return useMutation({
    mutationFn: register,
    onSuccess: (response: any) => {
        fn?.(response?.data?.link)
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useConfirmRegistrationLink = (fn?: () => void) => {
  return useMutation({
    mutationFn: confirmRegistrationLink,
    onSuccess: () => {
        fn?.()
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useSetPassword = (fn?: (v: string) => void) => {
  return useMutation({
    mutationFn: setPassword,
    onSuccess: (response: any) => {
        successToast({ param: null, msg: "Your account has been successfully created" })
        fn?.(response?.data?.link)
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};

// eslint-disable-next-line no-unused-vars
export const useForgotPassword = (fn?: (v: string) => void) => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response: any) => {
      console.log(response)
        successToast({ param: null, msg: "A password reset link has been sent to your email" })
        fn?.(response?.data?.link)
    },
    onError: (err: any) => {
        errorToast({ param: err, variant: "light" })
    },
  });
};