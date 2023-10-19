"use client";

import Form from "@/components/Form/Form";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import styles from "./signup.module.css";
import { useUserSignupMutation } from "@/redux/api/AuthApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { UserInfoProps } from "@/types";
import Swal from "sweetalert2";
import Link from "next/link";
import FormInput from "@/components/Form/FormInput";

const Signup = () => {
  const [userSignup] = useUserSignupMutation();
  const { role } = getUserInfo() as UserInfoProps;
  const router = useRouter();
  role && router.push(`/profile`);

  const onSubmit = async (data: any) => {
    try {
      const res = await userSignup(data).unwrap();
      if (res?.accessToken) {
        Swal.fire(
          "Signup successful!",
          "You account has been created!",
          "success"
        );
        storeUserInfo({ accessToken: res?.accessToken });
        router.push(`/profile`);
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  return (
    <div>
      <Navbar />
      <section
        className={`flex justify-center items-center min-h-screen ${styles.backgroundImage}`}
      >
        <div className="p-10 bg-slate-300 text-[#29323c] rounded-2xl shadow-lg">
          <div className="my-4">
            <h1 className="text-center font-bold text-2xl mb-2">Signup here</h1>
            <Divider className="bg-[#29323c]" />
          </div>
          <Form submitHandler={onSubmit}>
            <div>
              <div>
                <FormInput type="text" name="firstName" label="First Name" />
              </div>

              <div>
                <FormInput type="text" name="lastName" label="lastName" />
              </div>

              <div>
                <FormInput type="text" name="email" label="Email" />
              </div>

              <div>
                <FormInput type="password" name="password" label="Password" />
              </div>

              <div>
                <ButtonComponent>Submit</ButtonComponent>
              </div>
            </div>
          </Form>

          <Divider className="my-4" />
          <div>
            <Link href="/auth/login">Have you any account?</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
