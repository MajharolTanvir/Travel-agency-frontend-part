"use client";

import {
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
} from "@/redux/api/FeedbackApi";
import * as React from "react";
import Box from "@mui/material/Box";
import Spinner from "@/components/UI/Spinner";
import { Masonry } from "@mui/lab";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ButtonComponent from "@/components/UI/buttonComponent";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";

const Feedback = () => {
  const { data, isLoading } = useGetAllFeedbackQuery({});
  const [createFeedback] = useCreateFeedbackMutation();
  const { userId, role } = getUserInfo() as UserInfoProps;
  const [deleteFeedback] = useDeleteFeedbackMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const feedbacks = data?.feedback;

  const onSubmit = async (data: any) => {
    data.userId = userId;

    try {
      const res = await createFeedback(data).unwrap();
      if (res.id) {
        Swal.fire(
          "Feedback Created!",
          "Feedback created successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Feedback failed!", error.message, "error");
    }
  };

  const handleDelete = (id: string) => {
    deleteFeedback(id);
  };

  return (
    <div>
      {role === "super_admin" || role === "admin" ? (
        <Box>
          <Masonry columns={4} spacing={2}>
            {feedbacks!
              ?.map((feeds: any) => (
                <Box key={feeds?.id} className="p-10 text-justify shadow">
                  <h4 className="font-bold">
                    <span></span>
                    {feeds?.subject}
                  </h4>
                  <p>{feeds?.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p>{feeds.createdAt}</p>
                    <ButtonComponent onclick={() => handleDelete(feeds?.id)}>
                      <DeleteIcon />
                    </ButtonComponent>
                  </div>
                </Box>
              ))
              ?.reverse()}
          </Masonry>
        </Box>
      ) : (
        <Box className="w-96 p-5 shadow min-h-screen flex justify-center gap-5 items-center">
          <h1>Feedback Form</h1>
          <Form submitHandler={onSubmit}>
            <FormInput
              name="subject"
              label="Subject"
              size="large"
              type="text"
            />
            <FormTextArea name="description" label="Details" rows={8} />

            <ButtonComponent>Submit</ButtonComponent>
          </Form>
        </Box>
      )}
    </div>
  );
};

export default Feedback;
