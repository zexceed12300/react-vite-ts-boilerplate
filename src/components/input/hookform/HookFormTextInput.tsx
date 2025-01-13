import {
  FieldError,
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";

export type HookFormTextInputProps<TFormValues extends FieldValues> = {
  type?: string;
  label?: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  name: Path<TFormValues>;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  required?: boolean;
  options?: RegisterOptions;
};

export const HookFormTextInput = <TFormValues extends FieldValues>({
  type = "text",
  label = "",
  register,
  error,
  name,
  placeholder = "",
  readOnly = false,
  className = "",
  required = false,
}: HookFormTextInputProps<TFormValues>) => {
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
        placeholder={placeholder}
        readOnly={readOnly}
        className={`bg-gray-200 border-2 ${
          error ? "border-red-500" : "border-gray-200"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-1.5 outline-none`}
        {...register(name)}
      />
      {error && (
        <label className="block mt-1 text-sm text-red-600">
          {error.message}
        </label>
      )}
    </div>
  );
};
