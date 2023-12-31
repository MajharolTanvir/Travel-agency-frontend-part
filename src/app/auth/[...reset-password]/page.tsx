"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useResetPasswordMutation } from "@/redux/api/AuthApi";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import styles from "./reset.module.css";

const ResetPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const data = {
      query: searchParams?.token,
      values: values,
    };
    try {
      const res = await resetPassword(data).unwrap();
      if (!!res) {
        Swal.fire(
          "Login successful!",
          "Password reset successfully",
          "success"
        );
        router.push("/auth/signin");
      }
    } catch (error: any) {
      Swal.fire("Reset failed!", error?.message, "error");
    }
  };

  return (
    <section>
      <Navbar />
      <div
        className={`min-h-screen flex justify-center items-center  ${styles.backgroundImage}`}
      >
        <div className="p-5 md:p-10 backdrop-blur-3xl rounded-2xl text-black shadow-lg">
          <h2 className="text-center font-bold text-2xl mb-2 text-violet-700">
            Reset Password
          </h2>
          <Divider className="bg-violet-950" />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="password"
              name="password"
              size="large"
              label="Password"
            ></FormInput>
            <ButtonComponent>Submit</ButtonComponent>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
