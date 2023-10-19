import { getErrorMessageByPropertyName } from "@/utils/schemaValidation";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: string;
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  defaultValue?: string;
}

const FormTimePicker = ({
  name,
  id,
  placeholder,
  defaultValue,
  label,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {label && <label>{label}</label>}
            <input
              type="time"
              placeholder="Chose Date"
              defaultValue={defaultValue}
              {...field}
              id={id}
              className=" w-full border-2 h-14 rounded px-4 outline-blue-500"
            />
            <p className="text-red-500">{errorMessage}</p>
          </>
        )}
      />
    </div>
  );
};

export default FormTimePicker;
