"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Navbar from "@/components/Navbar/page";
import React, { useState } from "react";
import styles from "./login.module.css";
import { Divider } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import Swal from "sweetalert2";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { UserInfoProps } from "@/types";
import { useUserLoginMutation } from "@/redux/api/AuthApi";
import Link from "next/link";

const Login = () => {
  const [userLogin] = useUserLoginMutation();
  const { role } = getUserInfo() as UserInfoProps;
  const router = useRouter();
  role && router.push(`/profile`);

  const onSubmit = async (data: any) => {
    const res = await userLogin(data).unwrap();
    try {
      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        Swal.fire(
          "Login successful!",
          "You account has been logged in!",
          "success"
        );
        router.push(`/profile`);
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire("Login failed!", error?.message, "error");
    }
  };

  return (
    <div>
      <Navbar />
      <section
        className={`flex justify-center items-center min-h-screen ${styles.backgroundImage}`}
      >
        <div className="p-10 backdrop-blur-3xl text-white rounded-2xl">
          <div className="my-4">
            <h1 className="text-center font-bold text-2xl mb-2">Login here</h1>
            <Divider />
          </div>
          <Form submitHandler={onSubmit}>
            <div>
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

          <div className="my-1">
            <Link href="/auth/signup">Create new account?</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
