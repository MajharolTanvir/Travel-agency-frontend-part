"use client";

import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import { useGetSingleHotelQuery } from "@/redux/api/HotelApi";
import Image from "next/image";
import React from "react";

type IDProps = {
  params: any;
};

const HotelDetails = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useGetSingleHotelQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  console.log(data);

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
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-center mb-10">
          {data?.title}
        </h1>
        <div className="min-h-screen max-w-[700px] mx-auto">
          <div>
            <Image
              src={data?.hotelImage}
              alt="Hotel Image"
              width={400}
              height={400}
              className="w-full lg:w-[700px] rounded-md"
            />
          </div>
          <div className="my-10 flex justify-center items-center text-xs md:text-lg lg:text-xl">
            <div>
              <div>
                {data?.description && (
                  <span className="font-bold  my-1">About hotel: </span>
                )}
                {data?.description && <p>{data?.description}</p>}
              </div>
              <div>
                {data?.hotelType && (
                  <span className="font-bold  my-1">Hotel Type: </span>
                )}
                {data?.hotelType && <p>{data?.hotelType}</p>}
              </div>

              <div>
                {data?.district?.title && (
                  <span className="font-bold  my-1">District: </span>
                )}
                {data?.district?.title && <p>{data?.district?.title}</p>}
              </div>

              <div>
                {data?.contactNo && (
                  <span className="font-bold  my-1">Contact No: </span>
                )}
                {data?.contactNo && <p>{data?.contactNo}</p>}
              </div>

              <div>
                {data?.location && (
                  <span className="font-bold  my-1">Location: </span>
                )}
                {data?.location && <p>{data?.location}</p>}
              </div>

              <div>
                {data?.mapLocationUrl && (
                  <span className="font-bold  my-1">Hotel location: </span>
                )}
                {data?.mapLocationUrl && (
                  <a href={data?.mapLocationUrl}>Google map</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
