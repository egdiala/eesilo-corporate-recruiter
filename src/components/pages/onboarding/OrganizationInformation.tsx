import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { tabVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { onboardOrganizationInfoSchema } from "@/validations/onboarding";
import {
  useUpdateAccount,
  useUploadLogo,
} from "@/services/hooks/mutations/useAccount";
import {
  Button,
  ComboBox,
  ImageUpload,
  InputField,
  PhoneInput,
} from "@/components/core";
import {
  useGetCountries,
  useGetStatesByCountry,
} from "@/services/hooks/queries";
import { FetchedAccount } from "@/types/account";

export const OrganizationInformation: React.FC<{
    onClick: () => void;
    data: Partial<FetchedAccount> | undefined
  }> = ({
  onClick,
  data
}: {
  onClick: () => void;
  data: Partial<FetchedAccount>| undefined
}) => {
  const { mutate, isPending } = useUpdateAccount(
    "Organization information added successfully"
  );
  const { mutateAsync: uploadLogo, isPending: isUploading } = useUploadLogo();
  const [query, setQuery] = useState({
    country: "",
    state: "",
    city: "",
  });

  const extractNumbers = (str: string) => {
    // Use a regular expression to match all digits (\d)
    const numbers = str.match(/\d+/g);

    // Join the array of numbers into a single string
    return numbers ? numbers.join("") : "";
  };

  const {
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    register,
    setFieldValue,
    values,
  } = useFormikWrapper({
    initialValues: {
      name: data?.name || "",
      phone_number: `+${data?.phone_prefix} ${data?.phone_number}`  || "",
      website: data?.website || "",
      country: data?.address_data?.country || "",
      state: data?.address_data?.state || "",
      city: data?.address_data?.city || "",
      address: data?.address_data?.address || "",
      zip_code: data?.address_data?.zip_code || "",
      file: data?.avatar || "" as unknown,
    },
    validationSchema: onboardOrganizationInfoSchema,
    enableReinitialize: true,
    onSubmit: () => {
      const { name, phone_number, website, file } = values;
      const address_data = {
        country: values.country,
        country_code: selectedCountry?.phone_code,
        state: values.state,
        city: values.city,
        address: values.address,
        zip_code: values.zip_code,
      };
      if ((file as File)?.size > 0) {
        const formData = new FormData();
        formData.append("file", values.file as File);
        uploadLogo(formData).then(() =>
          mutate({
            address_data,
            name,
            phone_number: extractNumbers(phone_number).replace(
              selectedCountry?.phone_code as string,
              ""
            ),
            website,
            phone_prefix: selectedCountry?.phone_code,
          })
        );
      } else {
        mutate({
          address_data,
          name,
          phone_number: extractNumbers(phone_number).replace(
            selectedCountry?.phone_code as string,
            ""
          ),
          website,
          phone_prefix: selectedCountry?.phone_code,
        });
      }
    },
  });

  const { data: countries, isLoading: fetchingCountries } = useGetCountries();
  const fetchedCountries =
    query.country === ""
      ? countries
      : countries?.filter((country) => {
          return country.name
            .toLowerCase()
            .includes(query.country.toLowerCase());
        });

  const selectedCountry = useMemo(() => {
    return countries?.filter((item) => item?.name === values?.country)?.at(0);
  }, [countries, values?.country]);

  const { data: states, isLoading: fetchingStates } = useGetStatesByCountry(
    selectedCountry?.iso2 as string
  );
  const fetchedStates =
    query.state === ""
      ? states?.states
      : states?.states?.filter((state) => {
          return state.name.toLowerCase().includes(query.state.toLowerCase());
        });

  const defaultCountry = {
    capital: "Washington",
    iso2: "US",
    iso3: "USA",
    name: "United States",
    numeric_code: "840",
    phone_code: "1",
  };

  useEffect(() => {
    setFieldValue("country", defaultCountry?.name, false);
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={tabVariants.initial}
      animate={tabVariants.final}
      exit={tabVariants.initial}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-2">
        <h2 className="font-medium text-lg text-gray-900">
          Organization’s Information
        </h2>
        <p className="text-base text-gray-400">
          Provide basic information about your organization.
        </p>
      </div>
      <hr />
      <ImageUpload
        image={null}
        onReset={() => setFieldValue("file", "" as unknown)}
        size="64"
        type="company"
        setFile={(file) => setFieldValue("file", file)}
        showActions
      />
      <InputField
        label="Organization’s Name"
        placeholder="Organisation name"
        size="40"
        type="text"
        {...register("name")}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PhoneInput
          label="Telephone Number"
          placeholder="(555) 000-0000"
          size="40"
          value={values.phone_number}
          onChange={(v) => setFieldValue("phone_number", v, true)}
          error={errors.phone_number}
          required
        />
        <ComboBox
          label="Country"
          disabled={fetchingCountries}
          onClose={() =>
            setQuery((prev) => ({
              ...prev,
              country: "",
            }))
          }
          error={errors.country}
          options={fetchedCountries ?? []}
          onChange={(value) =>
            setQuery((prev) => ({
              ...prev,
              country: value,
            }))
          }
          onBlur={handleBlur}
          defaultValue={defaultCountry}
          displayValue={(item) => item?.name}
          optionLabel={(option) => option?.name}
          setSelected={(value) => setFieldValue("country", value?.name)}
          placeholder="Country"
          size="40"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComboBox
          label="State"
          disabled={fetchingStates}
          onClose={() =>
            setQuery((prev) => ({
              ...prev,
              state: "",
            }))
          }
          error={errors.state}
          options={fetchedStates ?? []}
          onChange={(value) =>
            setQuery((prev) => ({
              ...prev,
              state: value,
            }))
          }
          displayValue={(item) => item?.name}
          optionLabel={(option) => option?.name}
          setSelected={(value) => setFieldValue("state", value?.name)}
          placeholder="Select state"
          size="40"
          required
        />
        <InputField
          label="City"
          placeholder="City"
          size="40"
          type="text"
          {...register("city")}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Address"
          placeholder="Address"
          size="40"
          type="text"
          {...register("address")}
          required
        />
        <InputField
          label="Zip code"
          placeholder="Zip code"
          size="40"
          type="text"
          {...register("zip_code")}
          required
        />
      </div>
      <InputField
        label="Company Website"
        placeholder="Website"
        size="40"
        type="text"
        {...register("website")}
      />
      <Button
        type="submit"
        theme="primary"
        variant="filled"
        size="40"
        loading={isPending || isUploading}
        disabled={isUploading || isPending || !isValid}
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
