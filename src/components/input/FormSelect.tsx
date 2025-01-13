import React, { useEffect, useState, forwardRef } from "react";
import Select, { SingleValue } from "react-select";

type SelectOption = {
  value: string | number;
  label: string;
};

export type FormSelectProps = {
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number | null) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  isClearable?: boolean;
};

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  (
    {
      options = [{ value: 0, label: "" }],
      value,
      onChange,
      onBlur,
      name = "",
      disabled = false,
      className = "",
      placeholder = "",
      isClearable = false,
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
      null
    );

    useEffect(() => {
      const option = options.find((opt) => opt.value === value) || null;
      setSelectedOption(option);
    }, [options, value]);

    return (
      <Select
        placeholder={placeholder}
        value={selectedOption}
        classNames={{
          control: ({ isFocused }) =>
            `!flex !bg-gray-200 !border !px-1 ${
              isFocused ? "!border-blue-500" : "!border-gray-200"
            } !bg-gray-200 !text-sm !rounded-lg !w-full !outline-none`,
          menu: () => "!rounded-lg !border !shadow-lg",
          indicatorSeparator: () => "!hidden",
        }}
        onChange={(val) => {
          const selected = val as SingleValue<SelectOption> | null;
          onChange(selected?.value ?? null);
          setSelectedOption(selected);
        }}
        getOptionValue={(option) => option.value.toString()}
        options={options}
        onBlur={onBlur}
        name={name}
        className={className}
        isDisabled={disabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as React.Ref<any>}
        isClearable={isClearable}
        menuPosition="fixed"
      />
    );
  }
);

FormSelect.displayName = "FormSelect";
