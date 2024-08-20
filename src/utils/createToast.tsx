import { toast } from "sonner";
import { Toast, type ToastProps, type Variants, type Sizes } from "@/components/core";

interface CreateToastParams extends Partial<ToastProps> {
  param: Record<string, any> | null;
  msg?: string;
}

export const createToast = (options: ToastProps) =>
  toast.custom((t) => (<Toast id={t} {...options} />))

export function successToast({ param, msg, title = "Success", variant = "light", size = "32"}: CreateToastParams) {
  createToast({
    title: title,
    message: param?.message ?? param ?? msg,
    type: "success",
    variant: variant as Variants,
    size: size as Sizes
  });
}

export function errorToast({ param, title = "Error", variant = "filled", size = "32" }: CreateToastParams) {
  createToast({
    title: title,
    message: param?.response?.data?.msg ?? param?.message,
    type: "error",
    variant: variant as Variants,
    size: size as Sizes
  });
}