"use client";

import { getErrorMessageByPropertyName } from "@/utils/schemaValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  defaultValue?: string;
}

const FormInput = ({
  name,
  type,
  value,
  placeholder,
  validation,
  label,
  defaultValue,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (
     event: React.MouseEvent<HTMLButtonElement>
   ) => {
     event.preventDefault();
   };

   const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? (
        <InputLabel className="text-white mt-2" htmlFor={name}>
          {label}
        </InputLabel>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input
              {...field}
              className="text-white"
              id="standard-adornment-password"
              value={value ? value : field.value}
              defaultValue={defaultValue}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <TextField
              className="w-full mb-5 text-white p-2"
              {...field}
              variant="standard"
              placeholder={placeholder}
              value={value ? value : field.value}
              defaultValue={defaultValue}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
