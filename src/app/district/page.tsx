"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useDebounced } from "@/redux/hook";
import { Container, ImageList, ImageListItem, Input } from "@mui/material";
import Link from "next/link";
import CachedIcon from "@mui/icons-material/Cached";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";

const District = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = limit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

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
  console.log(districts);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
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
            className="w-96 lg:w-[20%]"
          />
          <div className="flex justify-between items-center gap-2">
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
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
                    {district?.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/district/${district.id}`}>
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

export default District;
