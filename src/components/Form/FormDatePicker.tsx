import { InputLabel, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: string;
  defaultValue?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

const FormDatePicker = ({
  name,
  type,
  size,
  defaultValue,
  id,
  placeholder,
  validation,
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
            <InputLabel className="text-white" htmlFor={name}>
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
          />
        </>
      )}
    />
  );
};

export default FormDatePicker;
