"use client";
import Navbar from "@/components/Navbar/page";
import Spinner from "@/components/UI/Spinner";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useGetSinglePackagePlanQuery } from "@/redux/api/PackageApi";
import { Masonry } from "@mui/lab";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type IDProps = {
  params: {
    id: string;
  };
};

const PackageDetails = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useGetSinglePackagePlanQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h2 className="text-center text-3xl my-4 font-bold">
          {data?.packageName}
        </h2>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Image
                src={data.thumbnail}
                alt="Package thumbnail"
                width={400}
                height={400}
                className="w-full"
              />
            </div>
            <div>
              <Masonry columns={3} spacing={2}>
                {data?.PackagePlaces.map((pack: any) => (
                  <div key={pack.id}>
                    <Image
                      className="w-full h-48"
                      src={pack?.place?.placeImage}
                      alt="Place image"
                      width={300}
                      height={300}
                    />
                    <h4>{pack?.place?.title}</h4>
                  </div>
                )).slice(0, 6)}
              </Masonry>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <h4 className="text-xl">
                <span className="font-bold">Traveler size: </span>
                {data.travelerSize}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Booking cost: </span>
                {data.bookingCost}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Travel start: </span>
                {data.startDate}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Travel end:</span> {data.endDate}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Travel start location:</span>
                {data.startLocation}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Travel end location:</span>
                {data.endLocation}
              </h4>
              <h4 className="text-xl">
                <span className="font-bold">Manager contact no:</span>
                {data.contactManager}
              </h4>
              <Link href={`/user/book-package/${data.id}`}>
                <ButtonComponent>Book now</ButtonComponent>
              </Link>
            </div>
            <div>
              <h4 className="text-xl">Description: {data.description}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
