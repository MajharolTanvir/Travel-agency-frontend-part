"use client";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useCreateFeedbackMutation } from "@/redux/api/FeedbackApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import React from "react";
import Swal from "sweetalert2";

const Feedback = () => {
  const [createFeedback] = useCreateFeedbackMutation();
  const { userId } = getUserInfo() as UserInfoProps;

  const onSubmit = async (data: any) => {
    data.userId = userId;
    try {
      const res = await createFeedback(data).unwrap();
      if (res?.id) {
        Swal.fire("Feedback send!", "Feedback send successfully", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.data, "error");
    }
  };

  return (
    <div>
      <DetailsTab title="Feedback field">
        <div className="w-full mx-auto min-h-screen flex justify-center items-center">
          <div className="shadow-xl p-2 lg:p-10 rounded-md">
            <Form submitHandler={onSubmit}>
              <h1 className="text-lg md:text-2xl font-bold text-center my-3">
                Give us your valuable feedback
              </h1>
              <div>
                <FormInput
                  type="text"
                  size="large"
                  name="subject"
                  label="Subject"
                />
              </div>

              <div>
                <FormTextArea rows={5} name="description" label="Description" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
                <ButtonComponent>Submit</ButtonComponent>
              </div>
            </Form>
          </div>
        </div>
      </DetailsTab>
    </div>
  );
};

export default Feedback;
