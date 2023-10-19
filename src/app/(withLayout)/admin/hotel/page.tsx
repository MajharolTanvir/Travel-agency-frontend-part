"use client";

import { useDebounced } from "@/redux/hook";
import Link from "next/link";
import React, { useState } from "react";
import {
  useDeleteHotelMutation,
  useGetAllHotelQuery,
} from "@/redux/api/HotelApi";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import TableComponent from "@/components/UI/tableComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CachedIcon from "@mui/icons-material/Cached";

const Hotel = () => {
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

  const { data, isLoading } = useGetAllHotelQuery({ ...query });
  if (isLoading) {
    return <p>Loading..........</p>;
  }

  //@ts-ignore
  const hotels = data?.hotel;
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    deleteHotel(id);
  };

  const columns: any = [
    { id: "title", label: "Division name" },
    { id: "hotelImage", label: "Hotel Image" },
    { id: "contactNo", label: "Contact No" },
    { id: "location", label: "Location" },
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
      <DetailsTab title="Manage Hotel">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/admin/hotel/create-hotel">
              <ButtonComponent>Create Hotel</ButtonComponent>
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
            {hotels?.map((hotel: any) => (
              <TableRow
                key={hotel?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{hotel?.title}</TableCell>
                <TableCell
                  align="center"
                  className="flex justify-center items-center"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={hotel?.hotelImage}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell align="center">{hotel?.contactNo}</TableCell>
                <TableCell align="center">{hotel?.location}</TableCell>

                <TableCell align="center">{hotel?.createdAt}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    <Link
                      href={`/admin/hotel/details/${hotel?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <RemoveRedEyeIcon />
                    </Link>
                    <Link
                      href={`/admin/hotel/edit/${hotel?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <EditIcon />
                    </Link>
                    <ButtonComponent onclick={() => handleDelete(hotel?.id)}>
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

export default Hotel;
