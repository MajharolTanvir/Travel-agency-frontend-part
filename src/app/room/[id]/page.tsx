/* eslint-disable react/jsx-key */
"use client";

import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormTimePicker from "@/components/Form/FormTimePicker";
import Navbar from "@/components/Navbar/page";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useBookedRoomMutation } from "@/redux/api/BookedHotelApi";
import { useGetSingleRoomQuery } from "@/redux/api/RoomApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import { Box, Container, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: any;
};

const RoomDetails = ({ params }: IDProps) => {
  const { id } = params;
  const [bookedRoom] = useBookedRoomMutation();
  const { userId } = getUserInfo() as UserInfoProps;

  const { data, isLoading } = useGetSingleRoomQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const onSubmit = async (values: any) => {
    try {
      const bookedData = {
        userId: userId,
        roomId: data?.id,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
      };

      const res = await bookedRoom(bookedData);
      if (!!res) {
        Swal.fire(
          "Room Booking!",
          "Room booked request send successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.data, "error");
    }
  };

  return (
    <div>
        <Navbar />
      <Container maxWidth="xl">
        <div className="min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-10 my-4">
            <div className="w-full">
              {data?.roomImages && (
                <ImageList cols={2}>
                  {data?.roomImages?.map((item: { url: string }) => (
                    <ImageListItem key={item.url}>
                      <Image
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        alt="Room image"
                        loading="lazy"
                        width={400}
                        height={400}
                        className="h-40 md:h-60"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </div>
            <div>
              {data?.roomType && (
                <p className="text-sm md:text-xl">
                  <span className="font-bold">Room Type:</span> {data?.roomType}
                </p>
              )}
              {data?.description && (
                <p className="text-sm md:text-xl">
                  <span className="font-bold">About Room: </span>
                  {data?.description}
                </p>
              )}
              {data?.roomPrice && (
                <p className="text-sm md:text-xl">
                  <span className="font-bold">Room price: </span>
                  {data?.roomPrice}
                </p>
              )}
              {data?.checkInTime && (
                <p className="text-sm md:text-xl">
                  <span className="font-bold">Check In Time: </span>
                  {data?.checkInTime}
                </p>
              )}
              {data?.checkOutTime && (
                <p className="text-sm md:text-xl">
                  <span className="font-bold">Check Out Time: </span>
                  {data?.checkOutTime}
                </p>
              )}
            </div>
          </div>
          <div className="w-[70%] mx-auto my-5 md:my-10 shadow-md p-10 rounded-lg">
            <h1 className="text-2xl font-bold">Room booking</h1>
            <Form submitHandler={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center">
                <div>
                  <FormDatePicker name="checkInDate" label="Check In Date" />
                </div>

                <div>
                  <FormDatePicker name="checkOutDate" label="Check Out Date" />
                </div>

                <ButtonComponent>Submit</ButtonComponent>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RoomDetails;
