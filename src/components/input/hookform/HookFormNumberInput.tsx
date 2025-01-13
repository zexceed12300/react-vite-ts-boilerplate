import React, { ReactNode } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

interface HookFormNumberInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  step?: number | null;
  type?: "number" | "float" | "byte";
  startContent?: ReactNode;
  endContent?: ReactNode;
  defaultUnit?: number;
}

export const HookFormNumberInput: React.FC<HookFormNumberInputProps> = ({
  name,
  control,
  label = "",
  error,
  placeholder = "",
  readOnly = false,
  className = "w-full",
  required = false,
  step = null,
  type = "number",
  startContent,
  endContent,
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
          <div
            className={`flex items-center appearance-none custom-number-input bg-gray-200 border-2 ${
              error ? "border-red-500" : "border-gray-200"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-none`}
          >
            {startContent && <div className="ml-2">{startContent}</div>}
            <input
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              step={step || undefined}
              placeholder={placeholder}
              value={field.value}
              name={field.name}
              onChange={(e) =>
                field.onChange(
                  e.target.value
                    ? type === "number"
                      ? parseInt(e.target.value)
                      : parseFloat(e.target.value)
                    : null
                )
              }
              onBlur={field.onBlur}
              ref={field.ref}
              readOnly={readOnly}
              className="w-full px-3 py-1.5 outline-none rounded-lg bg-gray-200"
            />
            {endContent && <div className="mr-2">{endContent}</div>}
          </div>
        )}
      />
      {error && (
        <label className="block text-sm text-red-600">{error.message}</label>
      )}
    </div>
  );
};
