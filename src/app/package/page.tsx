"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useDebounced } from "@/redux/hook";
import { CardActions, Container, Input } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import { useGetAllPackagePlanQuery } from "@/redux/api/PackageApi";
import Link from "next/link";

const Packages = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllPackagePlanQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const packagePlans = data?.packagePlan;

  const resetFilters = () => {
    setSearchTerm("");
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
        <div className="md:flex justify-between items-center gap-5 my-5 md:my-10">
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
          {packagePlans &&
            packagePlans?.map((packagePlan: any) => (
              <Card key={packagePlan.id}>
                <Image
                  src={packagePlan?.thumbnail}
                  alt="District image"
                  loading="lazy"
                  height={400}
                  width={400}
                  className="h-40 lg:h-80 lg:w-full"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span className="font-medium">Name: </span>
                    {packagePlan?.packageName}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    <span className="font-medium">Start date: </span>
                    {packagePlan?.startDate}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    <span className="font-medium">End date: </span>
                    {packagePlan?.endDate}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    <span className="font-medium">Start location: </span>
                    {packagePlan?.startLocation}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    <span className="font-medium">Traveler size: </span>
                    {packagePlan?.travelerSize}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/package/${packagePlan.id}`}>
                    <ButtonComponent>View details</ButtonComponent>
                  </Link>
                </CardActions>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Packages;
