"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useForgetPasswordMutation } from "@/redux/api/AuthApi";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import styles from "./forget.module.css";

const ForgetPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await forgetPassword(data);
      //@ts-ignore
      if (res?.data?.success) {
        Swal.fire("Login successful!", "Check your email", "success");
        router.push("https://mail.google.com/mail");
      }
    } catch (error: any) {
      Swal.fire("Email send failed!", error?.message, "error");
    }
  };

  return (
    <section>
      <Navbar />
      <div
        className={`min-h-screen flex justify-center items-center ${styles.backgroundImage}`}
      >
        <div className="w-full md:w-[600px] p-10 bg-slate-300 text-[#29323c] rounded-2xl">
          <h2 className="text-center font-bold text-2xl mb-2">
            Forget Password
          </h2>
          <Divider className="bg-[#29323c]" />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="email"
              name="email"
              size="large"
              label="Email"
            ></FormInput>
            <ButtonComponent>Submit</ButtonComponent>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
