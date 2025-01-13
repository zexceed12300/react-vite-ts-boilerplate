import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export type FormDatePickerProps = {
  name?: string;
  value: Date | null;
  onChange: (val: Date | null) => void;
  readOnly?: boolean;
};

export const FormDatePicker = ({
  name = "",
  value,
  onChange = () => {},
  readOnly = false,
}: FormDatePickerProps) => {
  return (
    <DatePicker
      name={name}
      value={value ? dayjs(value) : null}
      onChange={(val) => {
        onChange(val ? val.toDate() : null);
      }}
      readOnly={readOnly}
      slotProps={{
        textField: {
          fullWidth: true,
          helperText: "Select a date",
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
  );
};
