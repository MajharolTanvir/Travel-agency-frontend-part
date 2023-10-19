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
import { useCreateHotelMutation } from "@/redux/api/HotelApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreateHotel = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createHotel] = useCreateHotelMutation();
  const { data: districtData, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }

  const districts = districtData?.district;
  const districtOptions = districts?.map((district) => {
    return {
      //@ts-ignore
      label: district?.title,
      //@ts-ignore
      value: district?.id,
    };
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    data.hotelImage = imageUrl && imageUrl;

    try {
      const res = await createHotel(data).unwrap();
      if (!!res.id) {
        Swal.fire("Hotel Created!", "Hotel created successfully!", "success");
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
              label: "Manage hotel",
              link: "/admin/hotel",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create hotel">
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
                  placeholder="Select district"
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

export default CreateHotel;
