import React from "react";
import CarBooking from "@/assets/car-booking.png";
import groupTour from "@/assets/group_tour.png";
import guideBooking from "@/assets/guide_booking.png";
import hotelBooking from "@/assets/hotel_booking.png";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Guide booking",
      image: guideBooking,
    },
    {
      title: "Hotel booking",
      image: hotelBooking,
    },
    {
      title: "Car booking",
      image: CarBooking,
    },
    {
      title: "Package booking",
      image: groupTour,
    },
  ];
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start mb-10 border-b-2 inline border-violet-700">
        Provide services
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        {services.map((service) => (
          <div
            key={service.title}
            className="shadow relative w-full h-full overflow-hidden"
          >
            <Image
              src={service.image}
              alt="Service image"
              width={300}
              height={300}
              className="w-full h-full transform transition-transform hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
              <h3 className="text-2xl font-bold">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
