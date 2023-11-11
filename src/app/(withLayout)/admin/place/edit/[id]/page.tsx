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
import {
  useGetSinglePlaceQuery,
  useUpdatedPlaceMutation,
} from "@/redux/api/PlaceApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

const UpdatePlace = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { id } = params;
  const [updatePlace] = useUpdatedPlaceMutation();
  const { data, isLoading } = useGetSinglePlaceQuery(id);
  const { data: districtData } = useGetAllDistrictQuery({});

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const districts = districtData?.district;
  const districtOptions = districts?.map((district: any) => {
    return {
      label: district?.title,
      value: district?.id,
    };
  });

  const onSubmit = async (values: any) => {
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updatePlace(data);
      if (!!res) {
        Swal.fire("Place Updated!", "Place updated successfully!", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.data, "error");
    }
  };

  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
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
              label: "Manage Place",
              link: "/admin/place",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update Place">
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
                  name="districtId"
                  label="District"
                  options={districtOptions}
                  placeholder={data?.district?.title}
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

export default UpdatePlace;
