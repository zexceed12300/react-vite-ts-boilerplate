import React, { FC, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { debounce } from "../../utils/constants";
import { SingleValue } from "react-select";

type Option = {
  value: number;
  label: string;
};

type LoadOptionsParams = {
  search: string;
  limit: number;
};

export type FormAsyncSelectProps = {
  onChange: (value: number | null) => void;
  value: number | null;
  name?: string;
  onBlur?: React.FocusEventHandler;
  placeholder?: string;
  loadOptions?: (params: LoadOptionsParams) => Promise<Option[]>;
  initialSelectedOption?: Option | null | ((id: number) => Option);
  defaultOptions?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  getCurrentOption?: (option: Option | null) => void;
};

export const FormAsyncSelect: FC<FormAsyncSelectProps> = ({
  onChange,
  value = null,
  name = "",
  onBlur,
  placeholder = "",
  loadOptions = null,
  initialSelectedOption = null,
  defaultOptions = false,
  disabled = false,
  className = "",
  required,
  getCurrentOption = null,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [defaultOpt, setDefaultOpt] = useState<Option[] | null>(null);
  const [tempInitialSelectedOption, setTempInitialSelectedOption] =
    useState<Option | null>(null);

  const fetchDefaultOpt = async () => {
    if (!loadOptions) return;
    try {
      const options = await loadOptions({ search: "", limit: 20 });
      setDefaultOpt(options);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (initialSelectedOption && !tempInitialSelectedOption) {
      if (typeof initialSelectedOption !== "function") {
        setTempInitialSelectedOption(initialSelectedOption);
      }
    }
  }, [initialSelectedOption, tempInitialSelectedOption]);

  useEffect(() => {
    if (!selectedOption && tempInitialSelectedOption) {
      setSelectedOption(tempInitialSelectedOption);
    }
  }, [tempInitialSelectedOption, selectedOption]);

  // useEffect(() => {
  //   console.log("selectedOption:", selectedOption);
  // }, [selectedOption]);

  useEffect(() => {
    const fetchOption = async (id: number) => {
      if (typeof initialSelectedOption !== "function") return;

      try {
        const option = await initialSelectedOption(id);
        setSelectedOption(option);
        console.log("Fetched option:", option);
      } catch (err) {
        console.error(err);
      }
    };

    if (
      typeof initialSelectedOption === "function" &&
      value &&
      (!selectedOption || selectedOption.value !== value)
    ) {
      fetchOption(value);
    }

    if (!value) {
      setSelectedOption(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <AsyncSelect
      onChange={(val: SingleValue<Option>) => {
        if (getCurrentOption && typeof getCurrentOption === "function") {
          getCurrentOption(val);
        }
        setSelectedOption(val);
        onChange(val?.value ?? null);
      }}
      value={selectedOption?.value ? selectedOption : null}
      classNames={{
        control: ({ isFocused }) =>
          `!flex !bg-gray-200 !border !px-1 ${
            isFocused ? "!border-blue-500" : "!border-gray-200"
          }  !bg-gray-200 !text-sm !rounded-lg !w-full !outline-none`,
        menu: () => "!rounded-lg !border !shadow-lg",
        indicatorSeparator: () => "!hidden",
      }}
      menuPosition="fixed"
      placeholder={placeholder}
      name={name}
      onBlur={onBlur}
      loadOptions={debounce(
        async (searchValue: string, callback: (options: Option[]) => void) => {
          if (!loadOptions) return;
          try {
            const options = await loadOptions({
              search: searchValue,
              limit: 20,
            });
            callback(options);
          } catch (err) {
            console.error(err);
          }
        },
        300
      )}
      onMenuOpen={() => fetchDefaultOpt()}
      isDisabled={disabled}
      className={className}
      defaultOptions={defaultOptions ? defaultOpt ?? undefined : undefined}
      isClearable={!required}
    />
  );
};
