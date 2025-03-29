import React, { forwardRef, Fragment, ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import type { IconifyIcon } from "@iconify/types";
import { Description, Field, Input, Label } from "@headlessui/react";
import "./input.css";

interface InputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Size of input
   */
  size?: "40" | "36" | "32";
  /**
   * Helper text
   */
  help?: string | ReactNode;
  /**
   * Optional input
   */
  optional?: boolean;
  /**
   * Required input
   */
  required?: boolean;
  /**
   * Whether or not the field is disabled.
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * Right icon to render
   */
  iconRight?: string | IconifyIcon;
  /**
   * Left icon to render
   */
  iconLeft?: string | IconifyIcon;
  passwordIcon?: ReactNode;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Input component for entering user data
 */
export const InputField: React.FC<InputProps> = forwardRef(
  (
    {
      label,
      error,
      optional,
      required,
      iconLeft,
      iconRight,
      className,
      help,
      passwordIcon,
      disabled,
      passive,
      size,
      ...props
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <Field disabled={disabled} className="neesilo-input--outer">
        <RenderIf condition={!!label}>
          <div className="text-sm tracking-custom flex gap-px items-center">
            <Label passive={passive} className="neesilo-input--label">
              {label}
            </Label>
            {!!optional && (
              <span className="font-normal text-gray-500 text-sm">
                (Optional)
              </span>
            )}
            {!!required && (
              <div className="font-medium text-error-500 text-sm">*</div>
            )}
          </div>
        </RenderIf>
        <div className="neesilo-input--inner">
          <RenderIf condition={!!iconLeft}>
            <Icon
              icon={iconLeft as string | IconifyIcon}
              className="size-5 left-2.5 text-gray-400 peer-hover:text-gray-500 peer-focus:text-gray-500 peer-disabled:text-gray-300 mr-auto my-auto inset-0 absolute z-10"
            />
          </RenderIf>
          <Input as={Fragment}>
            {() => (
              <input
                ref={ref}
                className={cn(
                  "neesilo-input peer",
                  `neesilo-input--${size}`,
                  iconLeft && `neesilo-input--${size}-left`,
                  iconRight && `neesilo-input--${size}-right`,
                  error
                    ? "neesilo-input--border-error"
                    : "neesilo-input--border",
                  className
                )}
                {...props}
              />
            )}
          </Input>
          <RenderIf condition={!!iconRight}>
            <Icon
              icon={iconRight as string | IconifyIcon}
              className="size-5 right-2.5 text-gray-400 peer-disabled:text-gray-300 ml-auto my-auto inset-0 absolute z-10"
            />
          </RenderIf>
          <RenderIf condition={!!passwordIcon}>
            <div className="size-5 right-2.5 text-gray-400 peer-disabled:text-gray-300 ml-auto my-auto inset-0 absolute z-10">
              {passwordIcon}
            </div>
          </RenderIf>
        </div>
        <RenderIf condition={!!help}>
          <Description className="flex items-start gap-1 text-xs text-gray-500">
            {help}
          </Description>
        </RenderIf>
        <RenderIf condition={!!error}>
          <span className="neesilo-input--error">{error}</span>
        </RenderIf>
      </Field>
    );
  }
);
