"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import { useGetAllDivisionQuery } from "@/redux/api/DivisionApi";
import { useCreatePlaceMutation } from "@/redux/api/PlaceApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreatePlace = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createPlace] = useCreatePlaceMutation();
  const { data, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }

  const districts = data?.district;
  //@ts-ignore
  const districtOptions = districts?.map((district) => {
    return {
      //@ts-ignore
      label: district?.title,
      //@ts-ignore
      value: district?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.placeImage = imageUrl && imageUrl;

    try {
      const res = await createPlace(data).unwrap();
      if (res.id) {
        Swal.fire("Place Created!", "Place created successfully!", "success");
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
              label: "Admin",
              link: "/admin",
            },
            {
              label: "Manage place",
              link: "/admin/place",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create place">
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
                  name="districtId"
                  label="District"
                  options={districtOptions}
                  size="large"
                  placeholder="Select district"
                />
              </div>

              <div>
                <ImageUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                ></ImageUpload>
              </div>

              <div>
                <FormTextArea rows={4} name="description" label="Description" />
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

export default CreatePlace;
