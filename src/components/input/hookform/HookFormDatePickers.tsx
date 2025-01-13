import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface HookFormDatePickerProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label?: string;
  error?: FieldError;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
}

export const HookFormDatePicker: React.FC<HookFormDatePickerProps> = ({
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
          <DatePicker
            value={field.value ? dayjs(field.value) : null}
            onChange={(val) => {
              field.onChange(val ? (val as Dayjs).toDate() : null);
            }}
            readOnly={readOnly}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                variant: "outlined",
                InputProps: {
                  className:
                    "!font-inherit font-medium !rounded-lg !w-full !bg-gray-200 [&_input]:!py-1.5 [&_fieldset]:!border-none !outline-none",
                },
                InputLabelProps: {
                  className: "!text-blue-500", // Customize label color
                },
              },
            }}
            format="DD/MM/YYYY"
          />
        )}
      />
    </div>
  );
};
