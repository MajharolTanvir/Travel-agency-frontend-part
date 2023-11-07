"use client";

import { InputLabel, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface ITextArea {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string
}

const FormTextArea = ({
  name,
  rows,
  placeholder,
  label,
  defaultValue,
}: ITextArea) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-multiline-static"
            multiline
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            label={label}
            variant="standard"
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
