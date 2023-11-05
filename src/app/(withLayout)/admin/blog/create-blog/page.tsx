"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useCreateBlogMutation } from "@/redux/api/BlogApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { userId } = getUserInfo() as UserInfoProps;

  const onSubmit = async (data: any) => {
    data.thumbnail = imageUrl && imageUrl;
    data.userId = userId;

    try {
      const res = await createBlog(data).unwrap();
      if (res.id) {
        Swal.fire("Blog Created!", "Blog created successfully!", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-60 md:w-[400px] p-5 md:p-10 shadow-xl">
        <h1 className="text-xl md:text-2xl font-bold text-center my-2">
          Blog post
        </h1>
        <Form submitHandler={onSubmit}>
          <div>
            <FormInput name="title" label="Title" size="large" type="text" />
          </div>

          <div>
            <FormTextArea rows={8} name="description" label="Description" />
          </div>

          <div className="my-5">
            <ImageUpload
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            ></ImageUpload>
          </div>

          <ButtonComponent>Submit</ButtonComponent>
        </Form>
      </div>
    </div>
  );
};

export default CreateBlog;
