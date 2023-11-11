"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import Spinner from "@/components/UI/Spinner";
import ButtonComponent from "@/components/UI/buttonComponent";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/BlogApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface IDProps {
  params: any;
}

const UpdateBlog = ({ params }: IDProps) => {
  const { id } = params;
  const [updateBlog] = useUpdateBlogMutation();
  const { data, isLoading } = useGetSingleBlogQuery(id);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = async (data: any) => {
    data.thumbnail = imageUrl && imageUrl;

    try {
      const res = await updateBlog(data).unwrap();
      if (res.id) {
        Swal.fire("Blog Updated!", "Blog updated successfully!", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.data, "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-60 md:w-[400px] p-5 md:p-10 shadow-xl">
        <Form submitHandler={onSubmit}>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Blog post
          </h1>
          <div>
            <FormInput
              name="title"
              label="Title"
              size="large"
              type="text"
              defaultValue={data?.title}
            />
          </div>

          <div>
            <FormTextArea
              rows={4}
              name="description"
              label="Description"
              defaultValue={data?.value}
            />
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

export default UpdateBlog;
