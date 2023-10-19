/* eslint-disable react/jsx-key */
"use client";

import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import { useBookedRoomMutation } from "@/redux/api/BookedHotelApi";
import { useGetSingleRoomQuery } from "@/redux/api/RoomApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import { Box, ImageList, ImageListItem } from "@mui/material";
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
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  return (
    <div>
      <BreadcrumbsComponent
        items={[
          {
            label: "Admin",
            link: "/admin",
          },
          {
            label: "Manage room",
            link: "/admin/room",
          },
        ]}
      />
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
    </div>
  );
};

export default RoomDetails;
