import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import infoImageUrl from "@/assets/Information_tab.gif";
import travelImage from "@/assets/Travelers.gif";
import bookingImage from "@/assets/Hotel_Booking.gif";
import Image from "next/image";

const Services = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-center">
        What services we provide
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 my-10">
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={infoImageUrl}
              alt="Service image"
              width={345}
              height={100}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center font-bold"
            >
              Information about place
            </Typography>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={bookingImage}
              alt="Service image"
              width={345}
              height={100}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center font-bold"
            >
              Booking Hotel
            </Typography>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={travelImage}
              alt="Service image"
              width={345}
              height={100}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center font-bold"
            >
              Group travel
            </Typography>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

export default Services;
