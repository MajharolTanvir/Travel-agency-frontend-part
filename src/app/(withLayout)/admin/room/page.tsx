"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useDeleteHotelMutation } from "@/redux/api/HotelApi";
import { useGetAllRoomQuery } from "@/redux/api/RoomApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import { useDebounced } from "@/redux/hook";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableBody, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import TableComponent from "@/components/UI/TableComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Spinner from "@/components/UI/Spinner";


const Room = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading } = useGetAllRoomQuery({ ...query });
  const [deleteHotel] = useDeleteHotelMutation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const rooms = data?.room;

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

  const rows = rooms;

  const resetFilters = () => {
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
            {searchTerm && (
              <ButtonComponent onclick={resetFilters}>
                <CachedIcon />
              </ButtonComponent>
            )}
          </div>
        </div>
        {data && (
          <TableComponent
            columns={columns}
            rows={rows}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
          >
            <TableBody>
              {rows !== undefined &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.createdAt}
                      >
                        <TableCell>{row.roomType}</TableCell>
                        <TableCell>{row.roomPrice}</TableCell>
                        <TableCell>{row.checkInTime}</TableCell>
                        <TableCell>{row.checkOutTime}</TableCell>
                        <TableCell>{row.hotel.hotelName}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Travis Howard"
                            src={row?.placeImage}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.district?.title}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/room/edit/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <EditIcon />
                              </ButtonComponent>
                            </Link>
                            <Link
                              href={`/admin/room/details/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <VisibilityIcon />
                              </ButtonComponent>
                            </Link>
                            <ButtonComponent
                              onclick={() => handleDelete(row?.id)}
                            >
                              <DeleteIcon />
                            </ButtonComponent>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </TableComponent>
        )}
      </DetailsTab>
    </div>
  );
};

export default Room;
