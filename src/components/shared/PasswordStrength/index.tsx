import React, { useCallback, useMemo } from "react"
import { cn } from "@/libs/cn"
import { Icon, type IconifyIcon } from "@iconify/react"
import { motion } from "framer-motion"

interface PasswordStrengthProps {
  /**
   * Label for input element
   */
  value: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ value }) => {
    const rules = useMemo(() => {
        return [
            { label: "At least 1 uppercase", regex: /[A-Z]+/ },
            { label: "At least 1 number", regex: /\d+/ },
            { label: "At least 8 characters", regex: /^.{8,}$/ }
        ]
    },[])

    const iconToRender = useCallback((regex: RegExp): { isValid: boolean; icon: string | IconifyIcon } => {
        return regex.test(value) ? { isValid: true, icon: "ri:checkbox-circle-fill" } : { isValid: false, icon: "ri:close-circle-fill" }
    }, [value])

    const getBarStyles = useCallback(() => {
        const validCount = rules.filter(rule => rule.regex.test(value)).length;

        switch (validCount) {
            case 1:
                return [{ width: "100%", bgColor: "bg-error-500" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }];
            case 2:
                return [
                    { width: "100%", bgColor: "bg-warning-500" },
                    { width: "100%", bgColor: "bg-warning-500" },
                    { width: "0%", bgColor: "" }
                ];
            case 3:
                return [
                    { width: "100%", bgColor: "bg-success-500" },
                    { width: "100%", bgColor: "bg-success-500" },
                    { width: "100%", bgColor: "bg-success-500" }
                ];
            default:
                return [{ width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }];
        }
    }, [rules, value]);

    const barStyles = getBarStyles();

    return (
        <div className="flex flex-col gap-2 pt-1.5">
            <div className="flex items-center gap-2">
                {
                    barStyles.map((style, index) =>
                        <div key={index} className="bg-gray-200 h-1 flex-1 rounded-sm">
                            <motion.div initial={{ width: "0%" }} animate={{ width: style.width }} exit={{ width: "0px" }} transition={{ duration: 0.3, ease: "linear" }} className={cn("h-1 rounded-sm", style.bgColor)} />
                        </div>
                    )
                }
            </div>
            <p className="text-xs text-gray-500">Must contain at least;</p>
            {
                rules.map((rule) =>
                    <div key={rule?.label} className="flex items-center gap-1">
                        <Icon
                            icon={!value ? "ri:checkbox-circle-fill" : iconToRender(rule.regex).icon}
                            className={cn("size-4 text-gray-300", iconToRender(rule.regex).isValid && value && "text-success-500", !iconToRender(rule.regex).isValid && value && "text-gray-400")}
                        />
                        <span className={cn("flex-1 text-xs", value ? "text-gray-500" : "text-gray-400")}>{rule?.label}</span>
                    </div>
                )
            }
        </div>
    )
}