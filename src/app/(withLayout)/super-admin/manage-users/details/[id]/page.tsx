"use client";

import UserChange from "@/components/UI/UserChange";
import { useGetSingleUserQuery } from "@/redux/api/UserApi";
import { Avatar, Divider, Popover, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

type IDProps = {
  params: any;
};

const UserDetails = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleUserQuery(id);

  if (isLoading) {
    <p>Loading.........</p>;
  }


  return (
    <section className={`flex justify-center items-center min-h-screen`}>
      {data && (
        <div className="p-10 text-black backdrop-blur-3xl rounded-2xl w-[300px] md:w-[400px] lg:w-[600px] shadow-md">
          <div className="my-4 text-black flex flex-col justify-center items-center">
            <Avatar
              alt="Remy Sharp"
              src={data?.Profile[0]?.profileImage}
              sx={{ width: 80, height: 80 }}
              className="mb-4"
            />
            {data?.Profile[0]?.bio && (
              <p className="my-1">{data?.Profile[0]?.bio}</p>
            )}
          </div>
          <Divider className="my-4" />
          <div className="text-2xl md:text-3xl font-bold gap-3 w-full flex justify-center my-2">
            {data?.firstName && <h1>{data?.firstName}</h1>}
            {data?.middleName && <h1>{data?.middleName}</h1>}
            {data?.lastName && <h1>{data?.lastName}</h1>}
          </div>

          <Divider className="my-4" />

          <div className="text-lg md:text-xl">
            <div>
              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.role && <span className="font-bold  my-1">Role: </span>}
                {data?.role && <p>{data?.role}</p>}
              </div>
              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.email && (
                  <span className="font-bold  my-1">email: </span>
                )}
                {data?.email && <p>{data?.email}</p>}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.gender && (
                  <span className="font-bold  my-1">Gender: </span>
                )}
                {data?.Profile[0]?.gender && <p>{data?.Profile[0]?.gender}</p>}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.contactNo && (
                  <span className="font-bold  my-1">Contact No: </span>
                )}
                {data?.Profile[0]?.contactNo && (
                  <p>{data?.Profile[0]?.contactNo}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.dateOfBirth && (
                  <span className="font-bold  my-1">Date of birth: </span>
                )}
                {data?.Profile[0]?.dateOfBirth && (
                  <p>{data?.Profile[0]?.dateOfBirth}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.nid && (
                  <span className="font-bold  my-1">Nid no: </span>
                )}
                {data?.Profile[0]?.nid && <p>{data?.Profile[0]?.nid}</p>}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.passport && (
                  <span className="font-bold  my-1">Passport no: </span>
                )}
                {data?.Profile[0]?.passport && (
                  <p>{data?.Profile[0]?.passport}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.country && (
                  <span className="font-bold  my-1">Country: </span>
                )}
                {data?.Profile[0]?.country && (
                  <p>{data?.Profile[0]?.country}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.division && (
                  <span className="font-bold  my-1">Division: </span>
                )}
                {data?.Profile[0]?.division && (
                  <p>{data?.Profile[0]?.division}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.district && (
                  <span className="font-bold  my-1">District: </span>
                )}
                {data?.Profile[0]?.district && (
                  <p>{data?.Profile[0]?.district}</p>
                )}
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-5">
                {data?.Profile[0]?.area && (
                  <span className="font-bold  my-1">area: </span>
                )}
                {data?.Profile[0]?.area && <p>{data?.Profile[0]?.area}</p>}
              </div>
              <div>
                <UserChange id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserDetails;
