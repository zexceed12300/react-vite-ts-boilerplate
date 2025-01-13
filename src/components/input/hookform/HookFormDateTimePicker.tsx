import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { FormDateTimePicker } from "../FormDatetimePicker";

export type HookFormDatePickerTimeProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  error?: FieldError;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
}

export const HookFormDateTimePicker: React.FC<HookFormDatePickerTimeProps> = ({
  name,
  control,
  label = "",
  error,
  readOnly = false,
  className = "",
  required = false,
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
          <FormDateTimePicker
            value={field.value}
            onChange={field.onChange}
            readOnly={readOnly}
            onBlur={field.onBlur}
          />
        )}
      />
      {error && (
        <label className="block text-sm text-red-600">{error.message}</label>
      )}
    </div>
  );
};
