import React from "react";
import { cn } from "@/libs/cn";
import { RenderIf } from "@/components/core";
import { Description, Field, Label, Select } from "@headlessui/react";
import "./select.css";

interface SelectInputProps {
  /**
   * Label for select element
   */
  label?: string;
  /**
   * styles for select element
   */
  containerVariant?: string;
  /**
   * Help text for select element
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
   * Error message
   */
  error?: string | boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * Error message
   */
  size?: "40" | "36" | "32";
  /**
   * Options for select
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Disabled props
   */
  disabled?: boolean;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

export const SelectInput: React.FC<SelectInputProps> = ({ containerVariant, label, passive, optional, required, help, error, size, options, disabled = false, ...props }) => {
    return (
        <Field disabled={disabled} className={`${containerVariant} neesilo-input--outer`}>
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
            <RenderIf condition={!!help}>
                <Description className="neesilo-input--help">{help}</Description>
            </RenderIf>
            <div className="relative">
                <Select
                    className={cn(
                    "neesilo-input px-2",
                     `neesilo-input--${size}`,
                    error ? "neesilo-input--border-error" : "neesilo-input--border",
                    )} {...props}
                >

                    <option defaultValue=""></option>
                    {
                        options.map((option, idx) =>
                            <option key={idx} value={option.value}>{option.label}</option>
                        )
                    }
                </Select>
            </div>
            <RenderIf condition={!!error}>
                <span className='neesilo-input--error'>{error}</span>
            </RenderIf>
        </Field>
    )
}