"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useDebounced } from "@/redux/hook";
import { Container, Input } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";
import { useGetAllHotelQuery } from "@/redux/api/HotelApi";

const Hotel = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllHotelQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const hotels = data?.hotel;

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div className="md:flex justify-between items-center gap-5 md:my-10 my-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 lg:w-[20%]"
          />
          <div className="flex justify-between items-center gap-2">
            {!!searchTerm && (
              <ButtonComponent onclick={resetFilters}>
                <CachedIcon />
              </ButtonComponent>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels &&
            hotels?.map((hotel: any) => (
              <Card key={hotel.id}>
                <Image
                  src={hotel?.hotelImage}
                  alt="District image"
                  loading="lazy"
                  height={400}
                  width={400}
                  className="h-40 lg:h-80 lg:w-full"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    District: {hotel?.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Hotel;
