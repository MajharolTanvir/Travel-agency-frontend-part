"use client";

import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import FormTextArea from "@/components/Form/FormTextArea";
import FormTimePicker from "@/components/Form/FormTimePicker";
import MultipleImageUpload from "@/components/Form/UploadMultipleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useGetAllHotelQuery } from "@/redux/api/HotelApi";
import {
  useGetSingleRoomQuery,
  useUpdatedRoomMutation,
} from "@/redux/api/RoomApi";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

interface UploadedImage {
  url: string;
  thumbUrl: string;
}

const UpdateRoom = ({ params }: IDProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const { id } = params;
  const [updateRoom] = useUpdatedRoomMutation();
  const { data, isLoading } = useGetSingleRoomQuery(id);
  const { data: hotelData } = useGetAllHotelQuery({});

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const hotels = hotelData?.hotel;
  const hotelsOptions = hotels?.map((hotel: any) => {
    return {
      label: hotel?.title,
      value: hotel?.id,
    };
  });

  const onSubmit = async (values: any) => {

    values.roomPrice = parseInt(values?.roomPrice);
    values.roomImages = uploadedImages && uploadedImages;

    console.log(values)
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updateRoom(data);
      if (!!res) {
        Swal.fire("Room Updated!", "Room updated successfully!", "success");
      }
    } catch (error: any) {
     Swal.fire("Signup failed!", error.message, "error");
    }
  };

  const defaultValues = {
    roomType: data?.roomType || "",
    description: data?.description || "",
    roomPrice: data?.roomPrice || "",
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
              label: "Manage Room",
              link: "/admin/room",
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
                  name="roomType"
                  label="Room Type"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="roomPrice"
                  label="Room price"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormSelectFields
                  name="hotelId"
                  label="Hotel Name"
                  options={hotelsOptions}
                  size="large"
                  placeholder={data?.hotel?.title}
                />
              </div>

              <div>
                <FormTimePicker
                  name="checkInTime"
                  label={`Check In Time - ${data?.checkInTime}`}
                />
              </div>

              <div>
                <FormTimePicker
                  name="checkOutTime"
                  label={`Check Out Time - ${data?.checkOutTime}`}
                />
              </div>

              <div>
                <FormTextArea rows={4} name="description" label="Description" />
              </div>

              <div>
                <MultipleImageUpload
                  uploadedImages={uploadedImages}
                  setUploadedImages={setUploadedImages}
                  setImages={setImages}
                  images={images}
                ></MultipleImageUpload>
              </div>

              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <Avatar
                    key={index}
                    alt="Image"
                    src={image}
                    sx={{ width: 80, height: 80 }}
                  />
                ))}
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

export default UpdateRoom;
