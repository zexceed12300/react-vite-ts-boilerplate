import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormSelect } from "../FormSelect";

type SelectOption = {
  value: string | number;
  label: string;
};

interface HookFormSelectProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>; // Replace `any` with your form's schema type for stricter type safety.
  label?: string;
  error?: FieldError;
  placeholder?: string;
  options?: SelectOption[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
  getOptionValue?: (
    val: SelectOption | null,
    callback: (value: string | number | null) => void
  ) => void;
  isClearable?: boolean;
}

export const HookFormSelect: React.FC<HookFormSelectProps> = ({
  name,
  control,
  label = "",
  error,
  placeholder = "",
  options = [{ value: 0, label: "" }],
  className = "",
  disabled = false,
  required = false,
  getOptionValue,
  isClearable = false,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
          {required && (
            <span className="text-sm text-red-500 font-bold"> *</span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormSelect
            disabled={disabled}
            options={options}
            value={field.value}
            onChange={(val) => {
              if (typeof getOptionValue === "function") {
                getOptionValue(val as SelectOption | null, field.onChange);
              } else {
                field.onChange(val);
              }
            }}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            placeholder={placeholder}
            isClearable={isClearable}
          />
        )}
      />
      {error && (
        <label className="block mb-2 text-sm text-red-600">
          {error.message}
        </label>
      )}
    </div>
  );
};
