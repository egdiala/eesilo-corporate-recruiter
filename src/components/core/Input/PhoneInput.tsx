import React, { useEffect } from "react";
import PI from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./input.css";
import { RenderIf } from "../RenderIf";
import ReactDOM from "react-dom";

interface PhoneInputProps {
  /**
   * Label for phone input
   */
  label: string;
  /**
   * Value for phone input
   */
  value: string;
  /**
   * Change event for phone input. Emits E164Number or undefined
   */
  // eslint-disable-next-line no-unused-vars
  onChange: (value?: string | undefined) => void;
  /**
   * Prop to enforce international phone number format
   */
  international?: boolean;
  /**
   * Prop to edit the "country calling code" part of a phone number
   */
  countryCallingCodeEditable?: boolean;
  /**
   * Prop to render optional label
   */
  optional?: boolean;
  /**
   * Required input
   */
  required?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Size of input
   */
  size?: "40" | "36" | "32";
  /**
   * Arbitrary props
   */
  [x: string]: any;
}

const ArrowDownIcon = () => {
    return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1em" 
        height="1em" 
        viewBox="0 0 24 24"
        fill="none"
        className="mx-2"
    >
        <path d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" fill="#667085"/>
    </svg>
  );
};

/**
 * Phone input component for entering user phone number
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({ label, optional, required, error, international = false, countryCallingCodeEditable = false, placeholder = "Enter phone number", ...props }) => {
  useEffect(() => {
    const phoneInputCountrySelectArrow = document.querySelector(
      ".PhoneInputCountrySelectArrow"
    );
    phoneInputCountrySelectArrow?.classList.replace(
      "PhoneInputCountrySelectArrow",
      "phoneInputIcon"
    );
    const iconArrow = document.querySelector(".phoneInputIcon");
    if (iconArrow) {
      ReactDOM.render(<ArrowDownIcon />, iconArrow);
    }
    phoneInputCountrySelectArrow?.append((<ArrowDownIcon />) as any);
  }, []);
  return (
    <div className="neesilo-input--outer">
      <RenderIf condition={!!label}>
        <div className="text-sm tracking-custom flex gap-px items-center">
            <label className="neesilo-input--label">
                {label}
            </label>
            {!!optional && (
                <span className="font-normal text-gray-500 text-sm">(Optional)</span>
            )}
            {!!required && (
                <div className="font-medium text-error-500 text-sm">*</div>
            )}
        </div>
      </RenderIf>
      <PI
        placeholder={placeholder}
        countrySelectProps={{ unicodeFlags: false }}
        defaultCountry="US"
        international={international}
        countryCallingCodeEditable={countryCallingCodeEditable}
        {...props}
      />
      <RenderIf condition={!!error}>
        <span className="neesilo-input--error">{error}</span>
      </RenderIf>
    </div>
  );
};