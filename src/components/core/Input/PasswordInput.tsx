"use client";

import React, { useState } from "react";
import { InputField } from "./Input";
import { Icon } from "@iconify/react";

interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof InputField>, "type" | "iconRight"> {
  /**
   * Initial visibility state of password
   */
  initiallyVisible?: boolean;
  /**
   * Custom show password icon
   */
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ initiallyVisible = false, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <InputField
      ref={ref}
      type={isVisible ? "text" : "password"}
      passwordIcon={
        <button
          type="button"
          onClick={toggleVisibility}
          tabIndex={-1}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          <Icon
            icon={isVisible ? "ri:eye-off-line" : "ri:eye-line"}
            className="size-5 text-gray-500"
          />
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
