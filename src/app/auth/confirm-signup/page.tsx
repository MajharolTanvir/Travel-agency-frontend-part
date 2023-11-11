"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useConfirmSignupMutation } from "@/redux/api/AuthApi";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import styles from "./confirm-password.module.css";

const ConfirmPassword = () => {
  const [confirmSignup] = useConfirmSignupMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await confirmSignup(data);
      //@ts-ignore
      if (res?.data?.success) {
        Swal.fire("Signup successful!", "Your account has been created!", "success");
        router.push("/profile");
      }
    } catch (error: any) {
      Swal.fire("Validation failed!", error?.message, "error");
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
            Confirm signup
          </h2>
          <Divider className="bg-violet-950" />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="text"
              name="confirmedCode"
              size="large"
              label="Confirmation Code"
            ></FormInput>
            <ButtonComponent>Submit</ButtonComponent>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ConfirmPassword;
