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
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full hover:bg-gray-100  focus:ring-opacity-50  z-30 "
          tabIndex={-1}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          <Icon
            icon={isVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            className="size-5 text-gray-500"
          />
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
