import React, { type ReactNode, type ElementType } from "react"
import { Icon } from "@iconify/react"
import { RenderIf } from "../RenderIf"
import { Checkbox, Field, Label } from "@headlessui/react"

interface CheckboxProps {
  /**
   * Label for input element
   */
  label?: string | ReactNode;
  /**
   * The element or component the checkbox should render as.
   */
  as?: ElementType;
  /**
   * Whether or not the checkbox is checked.
   */
  checked?: boolean;
  /**
   * The default checked value when using as an uncontrolled component.
   */
  defaultChecked?: any;
  /**
   * Whether or not the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * The name used when using the checkbox inside a form.
   */
  name?: string;
  /**
   * The id of the form that the checkbox belongs to. If name is provided but form is not, the checkbox will add its state to the nearest ancestor form element.
   */
  form?: string;
  /**
   * The function to call when the checkbox is toggled.
   */
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Boolean) => void;
  /**
   * Whether or not the checkbox is indeterminate.
   */
  indeterminate?: boolean;
  /**
   * The value used when using this component inside a form, if it is checked.
   */
  value?: string;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Checkbox component for entering user data
 */
export const CheckBox: React.FC<CheckboxProps> = ({ as, disabled, passive = false, label, ...props }) => {
    return (
        <Field as={as} disabled={disabled} className="flex items-start lg:items-center gap-2">
            <Checkbox as={as} disabled={disabled} {...props} className="p-0.5 group grid transition duration-500 ease-out place-content-center size-4 rounded ring-1 ring-gray-200 data-[focus]:ring-offset-2 data-[checked]:ring-primary-500 data-[checked]:border-primary-500 data-[checked]:bg-primary-500 data-[checked]:hover:bg-primary-700 data-[checked]:hover:border-primary-700 data-[indeterminate]:ring-primary-500 data-[indeterminate]:border-primary-500 data-[indeterminate]:bg-primary-500 data-[focus]:bg-primary-800 data-[focus]:border-primary-800 data-[disabled]:shadow-md shadow-gray-300 data-[disabled]:bg-gray-200 data-[disabled]:border-gray-300 border border-gray-200 outline-none outline-0 ring-inset" style={{ boxShadow: "0px 2px 2px 0px rgba(15, 15, 16, 0.08) inset"}}>
                <Icon icon="ri:check-line" className="hidden size-3 text-white group-data-[checked]:block" />
                <Icon icon="ri:subtract-line" className="hidden size-3 text-white group-data-[indeterminate]:block" />
            </Checkbox>
            <RenderIf condition={!!label}>
                <Label passive={passive} className="-mt-1 lg:mt-0 flex-1">{label}</Label>
            </RenderIf>
        </Field>
    )
}