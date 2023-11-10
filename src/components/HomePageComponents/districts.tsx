"use client"
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IDistrict } from "@/types";
import ButtonComponent from "../UI/buttonComponent";
import Image from "next/image";
import Spinner from "../UI/Spinner";

const Districts = () => {
  const { data, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const districts = data?.district.slice(0, 8);
  const {total}: any = data?.meta
  return (
    <div className="my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start border-b-2 inline border-violet-700">
        Visit Bangladesh
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-10 mt-10">
        {districts?.map((district: IDistrict) => (
          <Card key={district?.id} className="w-full">
            <Image
              src={district?.districtImage}
              alt="district image"
              className="w-full h-80 md:w-full md:h-60"
              width={200}
              height={200}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {district?.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {district?.division?.title}
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonComponent>View details</ButtonComponent>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className="flex justify-end items-end mb-10">
        <ButtonComponent>View more</ButtonComponent>
      </div>
    </div>
  );
};

export default Districts;
