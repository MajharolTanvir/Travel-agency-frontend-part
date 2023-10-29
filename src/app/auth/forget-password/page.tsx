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
        <div className="p-5 md:p-10 backdrop-blur-3xl rounded-2xl text-black shadow-lg">
          <h2 className="text-center font-bold text-2xl mb-2 text-violet-700">
            Forget Password
          </h2>
          <Divider className="bg-violet-950" />
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
