import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import React from "react";

const Districts = () => {
  const { data, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    return <p>Loading......</p>;
  }

  //@ts-ignore
  const districts = data?.district.slice(0, 6);
  console.log(districts);

  return <div>Districts</div>;
};

export default Districts;
