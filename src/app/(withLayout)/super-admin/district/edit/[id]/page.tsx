"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import ImageUpload from "@/components/Form/UploadSingleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import {
  useGetSingleDistrictQuery,
  useUpdatedDistrictMutation,
} from "@/redux/api/DistrictApi";
import { useGetAllDivisionQuery } from "@/redux/api/DivisionApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

const UpdateDivision = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { id } = params;
  const [updateDistrict] = useUpdatedDistrictMutation();
  const { data, isLoading } = useGetSingleDistrictQuery(id);
  const { data: divisionData } = useGetAllDivisionQuery({});

  console.log(data)

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const divisions = divisionData?.division;
  const divisionOptions = divisions?.map((division: any) => {
    return {
      label: division?.title,
      value: division?.id,
    };
  });

  const onSubmit = async (values: any) => {
    values.districtImage = imageUrl && imageUrl;
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updateDistrict(data);
      if (!!res) {
        Swal.fire(
          "District Updated!",
          "District updated successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
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
              label: "Manage district",
              link: "/super-admin/district",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update district">
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                  placeholder={data?.division?.title}
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

export default UpdateDivision;
