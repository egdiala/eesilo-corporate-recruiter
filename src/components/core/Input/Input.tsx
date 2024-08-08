import React, { Fragment } from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import type { IconifyIcon } from "@iconify/types";
import { Description, Field, Input, Label } from "@headlessui/react"
import "./input.css";

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Helper text
   */
  help?: string;
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
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Input component for entering user data
 */
export const InputField: React.FC<InputProps> = ({ label, error, optional, required, iconLeft, iconRight, className, help, disabled, passive, ...props }) => {
    return (
        <Field disabled={disabled} className="neesilo-input--outer">
            <RenderIf condition={!!label}>
                <div className="text-sm tracking-custom flex gap-px items-center">
                    <Label passive={passive} className="neesilo-input--label">
                        {label}
                    </Label>
                    {!!optional && (
                        <span className="font-normal text-gray-500 text-sm">(Optional)</span>
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
                    className="size-5 left-3 text-gray-400 peer-hover:text-gray-500 peer-focus:text-gray-500 peer-disabled:text-gray-300 mt-[13px] inset-x-0 absolute z-10"
                />
                </RenderIf>
                <Input as={Fragment}>
                    {() => <input className={cn("neesilo-input peer", iconLeft ? "pl-10" : "pl-2", iconRight ? "pr-10" : "pr-2", error ? "neesilo-input--border-error" : "neesilo-input--border", className)} {...props} /> }
                </Input>
                <RenderIf condition={!!iconRight}>
                <Icon
                    icon={iconRight as string | IconifyIcon}
                    className="size-5 right-3 text-grey-dark-3 peer-focus:text-green-1 -mt-[2.1rem] absolute z-10"
                />
                </RenderIf>
            </div>
            <RenderIf condition={!!help}>
                <Description className="text-xs text-gray-500">{help}</Description>
            </RenderIf>
            <RenderIf condition={!!error}>
                <span className="neesilo-input--error">{error}</span>
            </RenderIf>
        </Field>
    );
};