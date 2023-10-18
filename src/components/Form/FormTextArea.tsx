"use client";

import { InputLabel, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface ITextArea {
  name: string;
  label?: string;
  rows?: number;
  value?: string | string[] | undefined;
  placeholder?: string;
}

const FormTextArea = ({ name, rows, value, placeholder, label }: ITextArea) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col">
      {label ? (
        <InputLabel className="text-[#485563] mt-2" htmlFor={name}>
          {label}
        </InputLabel>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            id="standard-multiline-static"
            multiline
            rows={rows}
            placeholder={placeholder}
            defaultValue={value}
            variant="standard"
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
