import React, { forwardRef } from "react";

export type FormTextInputProps = {
  type?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  error?: { message: string };
};

export const TextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  (
    {
      type = "text",
      label = "",
      value,
      onChange,
      onBlur,
      name = "",
      placeholder = "",
      readOnly = false,
      className = "",
      required = false,
      error = null,
    },
    ref
  ) => {
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
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          className={`bg-gray-200 border-2 ${
            error ? "border-red-500" : "border-gray-200"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 outline-none`}
        />
        {error && (
          <label className="block mb-2 text-sm text-red-600">
            {error.message}
          </label>
        )}
      </div>
    );
  }
);
