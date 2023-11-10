"use client";
import { useGetAllPlaceQuery } from "@/redux/api/PlaceApi";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IPlace } from "@/types";
import ButtonComponent from "../UI/buttonComponent";
import Image from "next/image";
import Spinner from "../UI/Spinner";

const Places = () => {
  const { data, isLoading } = useGetAllPlaceQuery({});

  if (isLoading) {
    return <Spinner />;
  }

  const places = data?.place.slice(0, 8);

  return (
    <div className="my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start border-b-2 inline border-violet-700">
        Popular destinations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 my-10">
        {places?.map((place: IPlace) => (
          <Card key={place?.id} sx={{ maxWidth: 345 }}>
            <Image
              src={place?.placeImage as string}
              alt="district image"
              className="w-96 h-60"
              width={200}
              height={200}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {place?.title}
              </Typography>
              <Typography
                className="h-8"
                variant="body1"
                color="text.secondary"
              >
                {place?.district?.title}
              </Typography>
              <Typography
                className="h-28"
                variant="body2"
                color="text.secondary"
              >
                {place?.description?.slice(0, 240)}
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonComponent>View Details</ButtonComponent>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Places;
