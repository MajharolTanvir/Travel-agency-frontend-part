import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";

const CarouselCompo = ({ pack }: any) => {

  return (
    <Swiper
      slidesPerView={2}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {pack.PackagePlaces.map((p: any) => (
        <SwiperSlide key={p.id}>
          <Image
            src={p.place.placeImage}
            alt="Place images"
            width={400}
            height={400}
            style={{ height: "400px", width: "100%" }}
            className="border-2 rounded-md"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselCompo;
