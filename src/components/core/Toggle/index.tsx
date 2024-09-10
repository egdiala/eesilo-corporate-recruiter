import React, { type ElementType } from "react"
import { Switch } from "@headlessui/react"

interface ToggleProps<T> {
    as?: ElementType;
    checked?: boolean;
    defaultChecked?: T;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: boolean) => void;
    name?: string;
    form?: string;
    value?: string;
}

export const Toggle: React.FC<ToggleProps<any>> = ({ as, checked, defaultChecked, onChange, name, form, value }) => {
    return (
        <div className="p-2">
            <Switch
                as={as}
                name={name}
                form={form}
                value={value}
                checked={checked}
                onChange={onChange}
                defaultChecked={defaultChecked}
                style={{ boxShadow: "0px 4px 4px 0px rgba(15, 15, 16, 0.06) inset" }}
                className="group relative flex h-4 w-7 cursor-pointer rounded-full bg-gray-200 p-0.5 transition-colors duration-300 ease-in-out focus:outline-none data-[focus]:outline-0 data-[focus]:bg-gray-300 data-[checked]:bg-primary-500"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none grid place-content-center size-3 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-300 ease-in-out group-data-[checked]:translate-x-3 group-data-[focus]:size-2.5"
                >
                    <span className="bg-gray-200 group-data-[checked]:bg-primary-500 size-1 rounded-full" style={{ boxShadow: "0px 2px 4px 0px rgba(27, 28, 29, 0.04)" }} />
                </div>
            </Switch>
        </div>
    )
}
