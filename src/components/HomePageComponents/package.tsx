import React from "react";
import Spinner from "../UI/Spinner";
import { useGetAllPackagePlanQuery } from "@/redux/api/PackageApi";
import Image from "next/image";
import CarouselCompo from "@/redux/api/Carousel";

const Package = () => {
  const { data, isLoading } = useGetAllPackagePlanQuery({});
  if (isLoading) {
    return <Spinner />;
  }

  const packagePlan = data?.packagePlan.slice(0,3);

  return (
    <>
      {packagePlan.length > 0 && (
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start mb-10">
            Our packages
          </h1>
          {packagePlan.map((pack: any) => (
            <div key={pack.id} className="relative">
              <div>
                <Image
                  className="w-full"
                  src={pack.thumbnail}
                  alt="Package image"
                  width={400}
                  height={400}
                />
              </div>
              <div className="grid grid-cols-2 absolute bottom-0">
                <div></div>
                <div>
                  <h2>{pack.packageName}</h2>
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
