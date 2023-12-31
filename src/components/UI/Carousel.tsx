import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";

const CarouselCompo = ({ pack }: any) => {

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
    >
      {pack.PackagePlaces.map((p: any) => (
        <SwiperSlide
          key={p.id}
          className="shadow relative w-full h-full overflow-hidden"
        >
          <Image
            src={p?.place?.placeImage}
            alt="Place images"
            width={400}
            height={400}
            className="w-44 h-44 md:w-64 md:h-60 lg:w-[420px] lg:h-80 transform transition-transform hover:scale-110 border rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
            <h3 className="text-sm md:text-md lg:text-2xl font-bold text-center">
              {p?.place?.title}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselCompo;
