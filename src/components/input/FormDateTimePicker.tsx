import React, { FC, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import InputAdornment from "@mui/material/InputAdornment";
import { TbCalendarFilled } from "react-icons/tb";
import dayjs from "dayjs";

export type FormDateTimePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}

export const FormDateTimePicker: FC<FormDateTimePickerProps> = ({
  value,
  onChange,
  name = "",
  onBlur,
  readOnly = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DateTimePicker
      value={value ? dayjs(value) : null}
      onChange={(val) => {
				onChange(val ? val.toDate() : null);
			}}
      onClose={() => setOpen(false)}
      open={open}
      slotProps={{
        textField: {
          onClick: () => setOpen(true),
          fullWidth: true,
          helperText: null,
          variant: "outlined",
          name,
          onBlur,
          InputProps: {
            className:
              "!font-inherit !rounded-lg !w-full !bg-gray-200 [&_input]:!py-1 [&_fieldset]:!border-none !outline-none",
            endAdornment: (
              <InputAdornment position="end">
                <TbCalendarFilled
                  size={24}
                  onClick={() => setOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          },
          InputLabelProps: {
            className: "!text-blue-500", // Customize label color
          },
        },
        popper: {
          className: "hide-scrollbar", // Custom class to hide scrollbar
        },
      }}
      format="L HH:mm"
      ampm={false}
      readOnly={readOnly}
      className={className}
    />
  );
};
