import React from "react";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { RenderIf } from "@/components/core";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from "@headlessui/react";

interface ComboBoxProps<T> {
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
   * Size of input
   */
  size?: "40" | "36" | "32";
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Options for select
   */
  options: T[];
  /**
   * Disabled props
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * Optional input
   */
  optional?: boolean;
  /**
   * Required input
   */
  required?: boolean;
  selected?: T;
  defaultValue?: T;
  // eslint-disable-next-line no-unused-vars
  setSelected: (value: T) => void;
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  displayValue?: (item: T) => string;
  // eslint-disable-next-line no-unused-vars
  optionLabel: (item: T) => any;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

export const ComboBox: React.FC<ComboBoxProps<any>> = ({ label, help, error, optional, required, passive, selected, options, onChange, displayValue, defaultValue, optionLabel, setSelected, onClose, disabled = false, size, className, ...props }) => {
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
            <Combobox disabled={disabled} value={selected} defaultValue={defaultValue} virtual={{ options }} onChange={(value) => setSelected(value)} onClose={onClose}>
                <div className="relative">
                <ComboboxInput
                    className={cn("neesilo-input peer pl-2 pr-8", `neesilo-input--${size}-right`, error ? "neesilo-input--border-error" : "neesilo-input--border", className)}
                    displayValue={(item) => displayValue?.(item)!}
                    onChange={(event) => onChange(event.target.value)}
                    {...props}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <Icon icon="ri:arrow-down-s-line" className="size-5 text-gray-400 group-data-[hover]:fill-gray-700" />
                </ComboboxButton>
                </div>
                
                <RenderIf condition={options.length > 0}>
                    <ComboboxOptions
                        anchor="bottom"
                        portal={false}
                        transition
                        className={cn(
                            "w-[var(--input-width)] rounded-b-lg shadow-lg z-10 bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:24rem]",
                            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                        )}
                    >
                        {({ option }) => (
                            <ComboboxOption
                            value={option}
                            className="group flex w-full cursor-pointer justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primary-25"
                            >
                            <div className="text-sm/6 line-clamp-1 text-gray-800 group-data-[selected]:text-primary-500 group-data-[selected]:font-medium">{optionLabel(option)}</div>
                            <Icon icon="lucide:check" className="invisible size-4 text-primary-500 group-data-[selected]:visible" />
                            </ComboboxOption>
                        )}
                    </ComboboxOptions>
                </RenderIf>
                <RenderIf condition={options.length === 0}>
                    <ComboboxOptions
                        anchor="bottom"
                        portal={false}
                        transition
                        className={cn(
                            "w-[var(--input-width)] rounded-b-lg shadow-lg z-10 bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:24rem]",
                            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                        )}
                    >
                        <div className="flex items-center justify-center text-center font-medium text-gray-500 py-1 text-sm w-full">No items found</div>
                    </ComboboxOptions>
                </RenderIf>
            </Combobox>
            <RenderIf condition={!!help}>
                <span className="neesilo-input--help">{help}</span>
            </RenderIf>
            <RenderIf condition={!!error}>
                <span className='neesilo-input--error'>{error}</span>
            </RenderIf>
        </Field>
    )
}