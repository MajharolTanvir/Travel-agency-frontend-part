"use client";

import Link from "next/link";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useDeleteHotelMutation } from "@/redux/api/HotelApi";
import { useGetAllRoomQuery } from "@/redux/api/RoomApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CachedIcon from "@mui/icons-material/Cached";
import { useDebounced } from "@/redux/hook";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Input, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import TableComponent from "@/components/UI/tableComponent";

const Room = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteHotel] = useDeleteHotelMutation();

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

  const handleDelete = (id: string) => {
    deleteHotel(id);
  };

  const columns: any = [
    { id: "roomType", label: "Room type" },
    { id: "roomPrice", label: "Room price" },
    { id: "checkInTime", label: "Check In Time" },
    { id: "checkOutTime", label: "Check Out Time" },
    { id: "hotelName", label: "Hotel Name" },
    { id: "createdAt", label: "Created At" },
    { id: "action", label: "Action" },
  ];

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
      <BreadcrumbsComponent
        items={[
          {
            label: "Admin",
            link: "/admin",
          },
        ]}
      />
      <DetailsTab title="Manage Room">
        <div className="md:flex justify-between items-center gap-5 mb-5">
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
        {data && (
          <TableComponent
            columns={columns}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            limit={limit}
            page={page}
            meta={meta}
          >
            {rooms?.map((room: any) => (
              <TableRow
                key={room?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{room?.roomType}</TableCell>
                <TableCell align="center">{room?.roomPrice}</TableCell>
                <TableCell align="center">{room?.checkInTime}</TableCell>
                <TableCell align="center">{room?.checkOutTime}</TableCell>
                <TableCell align="center">{room?.hotel?.title}</TableCell>

                <TableCell align="center">{room?.createdAt}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    <Link
                      href={`/admin/room/details/${room?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <RemoveRedEyeIcon />
                    </Link>
                    <Link
                      href={`/admin/room/edit/${room?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <EditIcon />
                    </Link>
                    <ButtonComponent onclick={() => handleDelete(room?.id)}>
                      <DeleteIcon />
                    </ButtonComponent>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        )}
      </DetailsTab>
    </div>
  );
};

export default Room;
