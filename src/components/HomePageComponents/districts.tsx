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

const Districts = () => {
  const { data, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    return <p>Loading......</p>;
  }

  //@ts-ignore
  const districts = data?.district.slice(0, 6);
  const {total}: any = data?.meta
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-center">
        CHOSE YOUR DREAM CITY - {total}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 my-10">
        {districts?.map((district: IDistrict) => (
          <Card key={district?.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="100"
              className="h-60"
              image={district?.districtImage}
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
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <div className="flex justify-end items-end">
        <ButtonComponent>View more</ButtonComponent>
      </div>
    </div>
  );
};

export default Districts;
