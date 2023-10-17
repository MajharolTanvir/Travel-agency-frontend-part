"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Navbar from "@/components/Navbar/page";
import React from "react";
import styles from './login.module.css'
import { Divider } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";

const Login = () => {
  const onSubmit = async (data: any) => {
    // message.loading("Signin....");
    // try {
    // //   const res = await userLogin(data).unwrap();
    //   if (res?.accessToken) {
    //     message.success("User sign in successfully");
    //     storeUserInfo({ accessToken: res?.accessToken });
    //     setLoading(!loading);
    //     if (role) {
    //       redirect(`/${role}/profile`);
    //       setLoading(!loading);
    //     }
    //   }
    // } catch (error: any) {
    //   message.error(error.message);
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
        </div>
      </section>
    </div>
  );
};

export default Login;
