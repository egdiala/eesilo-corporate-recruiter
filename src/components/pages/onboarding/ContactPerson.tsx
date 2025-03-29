import React from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Button, InputField, PhoneInput } from "@/components/core";
import { onboardContactPersonSchema } from "@/validations/onboarding";
import { useUpdateAccount } from "@/services/hooks/mutations/useAccount";
import { parsePhoneNumber } from "react-phone-number-input";
import { FetchedAccount } from "@/types/account";

export const ContactPerson: React.FC<{
  onClick: () => void;
  data: Partial<FetchedAccount> | undefined;
}> = ({
  onClick,
  data,
}: {
  onClick: () => void;
  data: Partial<FetchedAccount> | undefined;
}) => {
  const { mutate, isPending } = useUpdateAccount(
    "Contact person info added successfully"
  );

  const extractNumbers = (str: string) => {
    // Use a regular expression to match all digits (\d)
    const numbers = str.match(/\d+/g);

    // Join the array of numbers into a single string
    return numbers ? numbers.join("") : "";
  };

  const { errors, handleSubmit, isValid, register, setFieldValue, values } =
    useFormikWrapper({
      initialValues: {
        name: data?.contact_person?.name || "",
        job_title: data?.contact_person?.job_title || "",
        phone_number:
          `+${data?.contact_person?.phone_prefix} ${data?.contact_person?.phone_number} ` ||
          "",
        email: data?.contact_person?.email || "",
      },
      enableReinitialize: true,
      validationSchema: onboardContactPersonSchema,
      onSubmit: () => {
        const formattedPhoneNumber = extractNumbers(values.phone_number);
        const parsedPhoneNumber = parsePhoneNumber(values.phone_number);
        const contact_person = {
          email: values.email,
          phone_prefix: parsedPhoneNumber?.countryCallingCode,
          name: values.name,
          job_title: values.job_title,
          phone_number: formattedPhoneNumber?.startsWith(
            parsedPhoneNumber?.countryCallingCode as string
          )
            ? formattedPhoneNumber?.replace(
                parsedPhoneNumber?.countryCallingCode as string,
                ""
              )
            : formattedPhoneNumber,
        };
        mutate({ contact_person });
      },
    });
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={tabVariants.initial}
      animate={tabVariants.final}
      exit={tabVariants.initial}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-2">
        <h2 className="font-medium text-lg text-gray-900">Contact Person</h2>
        <p className="text-base text-gray-400">
          Provide basic information about your organization.
        </p>
      </div>
      <hr />
      <InputField
        label="Name of Contact Person"
        placeholder="Name"
        size="40"
        type="text"
        {...register("name")}
        required
      />
      <InputField
        label="Job Title"
        placeholder="Job title"
        size="40"
        type="text"
        {...register("job_title")}
        required
      />
      <PhoneInput
        label="Phone Number"
        placeholder="(555) 000-0000"
        size="40"
        value={values.phone_number}
        onChange={(v) => setFieldValue("phone_number", v, true)}
        error={errors.phone_number}
        required
      />
      <InputField
        label="Email"
        placeholder="Email"
        size="40"
        type="text"
        {...register("email")}
        required
      />
      <Button
        type="submit"
        theme="primary"
        variant="filled"
        size="40"
        loading={isPending}
        disabled={isPending || !isValid}
        block
      >
        Save and continue
      </Button>
      <Button
        type="button"
        theme="primary"
        variant="stroke"
        size="40"
        onClick={onClick}
        block
      >
        Skip for now
      </Button>
    </motion.form>
  );
};
