import { InputLabel } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  defaultValue?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

const FormDatePicker = ({
  name,
  defaultValue,
  id,
  placeholder,
  label,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          {label ? (
            <InputLabel htmlFor={name}>
              {label}
            </InputLabel>
          ) : null}
          <input
            {...field}
            type="date"
            placeholder={placeholder}
            id={id}
            className="w-full text-black border-b border-black/40 my-2 pb-1.5 bg-transparent outline-none"
            value={field.value || ""}
            defaultValue={defaultValue}
          />
        </>
      )}
    />
  );
};

export default FormDatePicker;
