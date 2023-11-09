'use client'

import React from "react";
import Spinner from "../UI/Spinner";
import { useGetAllPackagePlanQuery } from "@/redux/api/PackageApi";
import Image from "next/image";
import CarouselCompo from "@/components/UI/Carousel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ButtonComponent from "../UI/buttonComponent";
import Link from "next/link";

const Package = () => {
  const { data, isLoading } = useGetAllPackagePlanQuery({});
  if (isLoading) {
    return <Spinner />;
  }

  const packagePlan = data?.packagePlan.slice(0, 3);

  return (
    <>
      {packagePlan.length > 0 && (
        <div className="relative ">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start mb-10">
            Our packages
          </h1>
          {packagePlan.map((pack: any) => (
            <div key={pack.id} className="mb-2 w-[1000px] h-[600px]">
              <div className="shadow relative w-full h-full overflow-hidden">
                <Image
                  className="w-full h-full transform transition-transform hover:scale-110 border rounded-md"
                  src={pack.thumbnail}
                  alt="Package image"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                  <Link href={`/package/${pack.id}`}>
                    <ButtonComponent>View details</ButtonComponent>
                  </Link>
                </div>
              </div>
              <div className="w-[50%] absolute bottom-0 right-0">
                <div className="bg-black/70 p-5 rounded-md text-violet-600">
                  <h2 className="text-3xl font-medium text-center mb-3 pb-1 border-white border-b inline-block">
                    Visiting places
                  </h2>
                  <CarouselCompo pack={pack} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Package;
