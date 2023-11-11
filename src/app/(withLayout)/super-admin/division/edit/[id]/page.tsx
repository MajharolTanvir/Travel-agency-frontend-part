"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import {
  useDivisionUpdateMutation,
  useGetSingleDivisionQuery,
} from "@/redux/api/DivisionApi";
import React from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

const UpdateDivision = ({ params }: IDProps) => {
  const { id } = params;
  const [divisionUpdate] = useDivisionUpdateMutation();
  const { data, isLoading } = useGetSingleDivisionQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const onSubmit = async (values: any) => {
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await divisionUpdate(data);
      if (!!res) {
        Swal.fire(
          "Division Updated!",
          "Division updated successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.data, "error");
    }
  };

  const defaultValues = {
    title: data?.title || "",
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
      <DetailsTab title="Update Division">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div>
              <FormInput name="title" label="Title" size="large" type="text" />
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

export default UpdateDivision;
