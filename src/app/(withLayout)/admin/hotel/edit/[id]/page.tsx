"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { hotelOptions } from "@/constant/global";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import {
  useGetSingleHotelQuery,
  useUpdatedHotelMutation,
} from "@/redux/api/HotelApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

const UpdateHotel = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { id } = params;
  const [updateHotel] = useUpdatedHotelMutation();
  const { data, isLoading } = useGetSingleHotelQuery(id);
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
      const res = await updateHotel(data);
      if (!!res) {
       Swal.fire("Hotel Updated!", "Hotel updated successfully!", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
    contactNo: data?.contactNo || "",
    location: data?.location || "",
    mapLocationUrl: data?.mapLocationUrl || "",
    hotelType: data?.hotelType || "",
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
              label: "Manage Hotel",
              link: "/admin/hotel",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update hotel">
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
                <FormInput
                  name="contactNo"
                  label="Contact no"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="location"
                  label="Area Location"
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
                <FormSelectFields
                  name="hotelType"
                  label="Hotel Type"
                  options={hotelOptions}
                  placeholder="Select place"
                />
              </div>

              <div>
                <FormInput
                  name="mapLocationUrl"
                  label="Map Location url"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormTextArea rows={4} name="description" label="Description" />
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

export default UpdateHotel;
