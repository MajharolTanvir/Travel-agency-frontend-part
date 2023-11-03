"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useCreateDivisionMutation } from "@/redux/api/DivisionApi";
import React from "react";
import Swal from "sweetalert2";

const CreateDivision = () => {
  const [createDivision] = useCreateDivisionMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await createDivision(data).unwrap();
      console.log(res);
      if (res.id) {
        Swal.fire(
          "Division Created!",
          "Division created successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Division failed!", error.message, "error");
    }
  };
  return (
    <div>
      <div className="md:flex justify-between items-center">
        <BreadcrumbsComponent
          items={[
            {
              label: "Super-Admin",
              link: "/super-admin",
            },
            {
              label: "Manage division",
              link: "/super-admin/division",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create division">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start">
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="title"
                label="Title"
                size="large"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
              <ButtonComponent>Submit</ButtonComponent>
            </div>
          </Form>
        </div>
      </DetailsTab>
    </div>
  );
};

export default CreateDivision;
