import { useGetAllPlaceQuery } from "@/redux/api/PlaceApi";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IPlace } from "@/types";
import ButtonComponent from "../UI/buttonComponent";
import Image from "next/image";

const Places = () => {
  const { data, isLoading } = useGetAllPlaceQuery({});

  if (isLoading) {
    return <p>Loading......</p>;
  }

  const places = data?.place.slice(0, 8);
  const { total }: any = data?.meta;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start">
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
              <Typography gutterBottom variant="h5" component="div">
                {place?.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {place?.district?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
