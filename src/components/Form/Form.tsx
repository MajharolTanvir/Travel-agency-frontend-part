"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FromProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FromProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<FromProps>(formConfig);
  const { handleSubmit, reset } = methods;

  useEffect(() => reset(), [reset]);

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;