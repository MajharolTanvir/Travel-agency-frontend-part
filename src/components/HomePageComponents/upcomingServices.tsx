import React from 'react'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import guideBooking from "@/assets/Tour_guide.gif";
import boatImage from "@/assets/Yacht.gif";
import airImage from "@/assets/Airport.gif";
import packageImage from "@/assets/Package_guide.gif";
import Image from 'next/image';

const UpcomingServices = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#29323c] text-center">
        Services we launch soon
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 my-10">
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={guideBooking}
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
              Guide booking
            </Typography>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={boatImage}
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
              Boat booking
            </Typography>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={airImage}
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
              Air booking
            </Typography>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <Image
              src={packageImage}
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
              Package trip
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UpcomingServices