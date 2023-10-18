"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import ImageUpload from "@/components/Form/UploadSingleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useCreateDistrictMutation } from "@/redux/api/DistrictApi";
import { useGetAllDivisionQuery } from "@/redux/api/DivisionApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreateDivision = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createDistrict] = useCreateDistrictMutation();
  const { data, isLoading } = useGetAllDivisionQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }

  //@ts-ignore
  const divisions = data?.division;
  const divisionOptions = divisions?.map((division) => {
    return {
      label: division?.title,
      value: division?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.districtImage = imageUrl && imageUrl;
    console.log(data);
    try {
      const res = await createDistrict(data).unwrap();
      if (res.id) {
        Swal.fire(
          "District Created!",
          "District created successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
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
              label: "Manage district",
              link: "/super-admin/district",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create District">
        <div>
          <Form submitHandler={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start gap-5">
              <div>
                <FormInput
                  name="title"
                  label="Title"
                  size="large"
                  type="text"
                />
              </div>
              <div>
                <FormSelectFields
                  name="divisionId"
                  label="Division"
                  options={divisionOptions}
                  placeholder="Select division"
                />
              </div>
              <div>
                <ImageUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                ></ImageUpload>
              </div>
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
