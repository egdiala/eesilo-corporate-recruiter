import React, { Fragment, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { createJobSchema } from "@/validations/job";
import { capitalizeWords } from "@/utils/capitalize";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJob } from "@/services/hooks/mutations";
import { pageVariants } from "@/constants/animateVariants";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import {
  Button,
  ComboBox,
  InputField,
  RenderIf,
  SelectInput,
  Tag,
  TextArea,
} from "@/components/core";
import {
  useGetCountries,
  useGetJob,
  useGetJobRequirements,
  useGetStatesByCountry,
} from "@/services/hooks/queries";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { cn } from "@/libs/cn";
import { Loader } from "@/components/core/Button/Loader";

export const EditJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { data: job } = useGetJob(jobId as string);
  console.log(job, "JOB");
  const { mutate: edit, isPending } = useUpdateJob(
    "You have successfully edited a job post.",
    () => navigate(`/jobs/${jobId}/view`)
  );
  const [query, setQuery] = useState({
    country: "",
    state: "",
    city: "",
    requirements: "",
  });
  const { handleSubmit, isValid, errors, setFieldValue, register, values } =
    useFormikWrapper({
      initialValues: {
        title: job?.title || "",
        description: job?.description || "",
        year_exp: job?.year_exp || "",
        country: capitalizeWords(job?.country || ""),
        state: capitalizeWords(job?.state || ""),
        city: capitalizeWords(job?.city || ""),
        job_req: job?.job_req || "",
        about_job: job?.job_about || "",
        job_keyword: job?.job_keyword || [],
        required_travel: job?.required_travel?.toString() || "",
        required_relocation: job?.required_relocation?.toString() || "",
        expected_salary: job?.expected_salary?.toString() || "",
      },
      validationSchema: createJobSchema,
      enableReinitialize: true,
      onSubmit: () => {
        const { required_travel, year_exp, required_relocation, ...rest } =
          values;
        const new_year_exp = year_exp.toString();
        const new_required_travel = required_travel === "yes" ? "1" : "0";
        const new_required_relocation =
          required_relocation === "yes" ? "1" : "0";
        edit({
          ...rest,
          required_travel: new_required_travel,
          required_relocation: new_required_relocation,
          year_exp: new_year_exp,
          jobId: jobId as string,
        });
      },
    });

  const { data: fetchedRequirements, isLoading: fetchingRequirements } =
    useGetJobRequirements({ q: query.requirements });

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

  const booleanOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.requirements.trim() !== "") {
      if (e.key === "Enter") {
        setFieldValue(
          "job_keyword",
          [
            ...values.job_keyword,
            ...query.requirements
              .split(",")
              .filter((item) => item.trim() !== ""),
          ],
          true
        );
      }
      if (e.key === ",") {
        setFieldValue(
          "job_keyword",
          [
            ...values.job_keyword,
            ...query.requirements
              .split(",")
              .filter((item) => item.trim() !== ""),
          ],
          true
        ).then(() =>
          setQuery((prev) => ({
            ...prev,
            requirements: "",
          }))
        );
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="final"
      exit={pageVariants.initial}
    >
      <div className="flex flex-col gap-0 view-page-container overflow-hidden">
        <div className="flex items-center gap-2.5 py-5 px-4 md:px-8 border-b border-b-gray-200 bg-white">
          <Button
            type="button"
            theme="neutral"
            variant="ghost"
            size="40"
            onClick={() => navigate(`/jobs/${jobId}/view`)}
          >
            <Icon icon="ri:arrow-left-s-line" className="size-5" />
            Back
          </Button>
          <h1 className="text-lg text-gray-900">Edit Job</h1>
        </div>
        <div className="flex-1 flex-col overflow-y-scroll view-subpage-container px-4 lg:px-8 pt-5 pb-10">
          <div className="bg-white rounded-2xl p-4 lg:p-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 max-w-[42.563rem] w-full"
            >
              <h2 className="font-medium text-xl text-gray-900">
                Edit Job Post
              </h2>
              <InputField
                type="text"
                label="Job Title"
                placeholder="Job title"
                size="40"
                {...register("title")}
                required
              />
              <TextArea
                label="About Job"
                placeholder="About Job"
                rows={5}
                {...register("about_job")}
                required
              />
              <TextArea
                label="Job Description"
                placeholder="Job description"
                rows={5}
                {...register("description")}
                required
              />
              <TextArea
                label="Requirements"
                placeholder="Requirements"
                rows={5}
                {...register("job_req")}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <InputField
                    type="number"
                    label="Years of Experience"
                    placeholder="Enter number"
                    className="hide-number-input-arrows"
                    size="40"
                    {...register("year_exp")}
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <SelectInput
                    label="Requires Travel?"
                    options={booleanOptions}
                    {...register("required_travel")}
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <SelectInput
                    label="Requires Relocation?"
                    options={booleanOptions}
                    {...register("required_relocation")}
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
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
                    defaultValue={
                      countries?.filter(
                        (country) =>
                          country.name.toLowerCase() ==
                          job?.country?.toLowerCase()
                      )?.[0]
                    }
                    displayValue={(item) => item?.name}
                    optionLabel={(option) => option?.name}
                    setSelected={(value) =>
                      setFieldValue("country", value?.name)
                    }
                    placeholder="Country"
                    size="40"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
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
                    defaultValue={
                      states?.states?.filter(
                        (state) =>
                          state.name.toLowerCase() == job?.state?.toLowerCase()
                      )?.[0]
                    }
                    displayValue={(item) => item?.name}
                    optionLabel={(option) => option?.name}
                    setSelected={(value) => setFieldValue("state", value?.name)}
                    placeholder="Select state"
                    size="40"
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <InputField
                    type="text"
                    label="City"
                    placeholder="City"
                    size="40"
                    {...register("city")}
                    required
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <InputField
                    type="text"
                    label="Annual Salary Expectation ($)"
                    placeholder="Enter number"
                    size="40"
                    help={
                      <Fragment>
                        <Icon
                          icon="ri:error-warning-fill"
                          className="size-4 text-gray-400"
                        />
                        Won't be shown to candidates
                      </Fragment>
                    }
                    {...register("expected_salary")}
                    required
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <Field className="neesilo-input--outer">
                    <div className="text-sm tracking-custom flex gap-px items-center">
                      <Label passive className="neesilo-input--label">
                        Key words
                      </Label>
                      <div className="font-medium text-error-500 text-sm">
                        *
                      </div>
                    </div>
                    <Combobox
                      multiple
                      value={values.job_keyword}
                      onChange={(value) => setFieldValue("job_keyword", value)}
                      onClose={() =>
                        setQuery((prev) => ({
                          ...prev,
                          requirements: "",
                        }))
                      }
                    >
                      <ComboboxInput
                        aria-label="Requirements"
                        placeholder="Nursing Assistant"
                        className={cn(
                          "neesilo-input peer px-2",
                          "neesilo-input--40",
                          errors.job_keyword
                            ? "neesilo-input--border-error"
                            : "neesilo-input--border"
                        )}
                        onChange={(event) =>
                          setQuery((prev) => ({
                            ...prev,
                            requirements: event.target.value,
                          }))
                        }
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                      <ComboboxOptions
                        anchor="bottom"
                        portal={false}
                        transition
                        className={cn(
                          "w-[var(--input-width)] rounded-b-lg shadow-lg z-10 bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:12rem]",
                          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                        )}
                      >
                        <RenderIf
                          condition={
                            fetchedRequirements !== undefined &&
                            fetchedRequirements?.length > 0 &&
                            !fetchingRequirements
                          }
                        >
                          {fetchedRequirements?.map((item) => (
                            <ComboboxOption
                              key={item.requirement}
                              value={item.requirement}
                              className="group flex cursor-pointer justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primary-25"
                            >
                              <div className="text-sm/6 text-gray-800 group-data-[selected]:text-primary-500 group-data-[selected]:font-medium">
                                {item.requirement}
                              </div>
                              <Icon
                                icon="lucide:check"
                                className="invisible size-4 text-primary-500 group-data-[selected]:visible"
                              />
                            </ComboboxOption>
                          ))}
                        </RenderIf>
                        <RenderIf
                          condition={
                            fetchedRequirements?.length === 0 &&
                            !fetchingRequirements
                          }
                        >
                          <div className="flex items-center justify-center text-center font-medium text-gray-500 py-2 text-sm w-full">
                            No items found
                          </div>
                        </RenderIf>
                        <RenderIf condition={fetchingRequirements}>
                          <div className="flex w-full h-10 items-center justify-center">
                            <Loader className="spinner size-4 text-primary-500" />
                          </div>
                        </RenderIf>
                      </ComboboxOptions>
                    </Combobox>
                  </Field>
                </div>
              </div>
              <RenderIf condition={values.job_keyword.length > 0}>
                <div className="flex items-center gap-4 flex-wrap">
                  {values.job_keyword.map((item) => (
                    <Tag key={item} theme="stroke" closeable>
                      {item}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "job_keyword",
                            values.job_keyword.filter((v) => v !== item)
                          )
                        }
                      >
                        <Icon
                          icon="ri:close-line"
                          className="size-3.5 text-gray-400"
                        />
                      </button>
                    </Tag>
                  ))}
                </div>
              </RenderIf>

              <div className="grid md:grid-cols-2">
                <Button
                  type="submit"
                  theme="primary"
                  variant="filled"
                  size="40"
                  loading={isPending}
                  disabled={isPending || !isValid}
                  block
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
