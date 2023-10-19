"use client";

import Navbar from "@/components/Navbar/page";
import ButtonComponent from "@/components/UI/buttonComponent";
import { useGetAllRoomQuery } from "@/redux/api/RoomApi";
import { useDebounced } from "@/redux/hook";
import { Container, ImageList, ImageListItem, Input } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const RoomPage = () => {
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

  const { data, isLoading } = useGetAllRoomQuery({ ...query });
  if (isLoading) {
    return <p>Loading..........</p>;
  }

  //@ts-ignore
  const rooms = data?.room;
  //@ts-ignore
  const meta = data?.meta;

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
        <div className="md:flex justify-between items-center gap-5 mb-5 my-5 md:my-10">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/admin/room/create-room">
              <ButtonComponent>Create Room</ButtonComponent>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <ButtonComponent onclick={resetFilters}>
                <CachedIcon />
              </ButtonComponent>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rooms &&
            rooms?.map((room: any) => (
              <Card key={room.id}>
                <ImageList cols={2}>
                  {room?.roomImages?.map((item: { url: string }) => (
                    <ImageListItem key={item.url}>
                      <Image
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        alt="room images"
                        loading="lazy"
                        height={400}
                        width={400}
                        className="h-40 lg:h-60"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {room?.roomType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {room?.description.slice(0, 200)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/room/${room.id}`}>
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

export default RoomPage;
