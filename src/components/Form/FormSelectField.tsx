"use client";

import { InputLabel, NativeSelect } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export interface ISelectFieldOptions {
  label: string;
  value: string;
}

export interface ISelectField {
  options: ISelectFieldOptions[];
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  defaultValue?: ISelectFieldOptions;
  handleChange?: (el: string) => void;
}

const FormSelectFields = ({
  name,
  placeholder,
  options,
  label,
  defaultValue,
  handleChange,
}: ISelectField) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? (
        <InputLabel className="text-white" htmlFor={name}>
          {label}
        </InputLabel>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <NativeSelect
            className="flex flex-row text-black my-2 pb-.5"
            defaultValue={defaultValue}
            inputProps={{
              name: placeholder,
            }}
            value={value}
            placeholder={placeholder}
            onChange={handleChange ? handleChange : onChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        )}
      />
    </>
  );
};

export default FormSelectFields;
