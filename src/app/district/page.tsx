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
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";

const District = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");


  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllDistrictQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const districts = data?.district;

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div className="md:flex justify-between items-center gap-5 md:my-10">
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
          {districts &&
            districts?.map((district: any) => (
              <Card key={district.id}>
                <Image
                  src={district?.districtImage}
                  alt="District image"
                  loading="lazy"
                  height={400}
                  width={400}
                  className="h-40 lg:h-80 lg:w-full"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    District: {district?.title}
                  </Typography>
                </CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {district.Place.map((p: any) => (
                    <div key={p.id}>
                      <Image
                        src={p?.placeImage}
                        alt="Place image"
                        loading="lazy"
                        height={300}
                        width={400}
                        className="h-40 lg:h-60 lg:w-full"
                      />
                      <h4 className="my-2 mx-1">{p.title}</h4>
                      <p className="mx-1 text-justify">
                        {p.description.slice(0, 150)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default District;
