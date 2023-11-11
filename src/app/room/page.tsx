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
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";

const RoomPage = () => {
  const query: Record<string, any> = {}
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllRoomQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const rooms = data?.room;

  const resetFilters = () => {
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
            className="w-80 lg:w-[20%]"
          />
          <div className="flex justify-between items-center gap-2">
            {(!!searchTerm) && (
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
