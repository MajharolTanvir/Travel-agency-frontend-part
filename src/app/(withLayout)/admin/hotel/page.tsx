"use client";

import { useDebounced } from "@/redux/hook";
import Link from "next/link";
import React, { useState } from "react";
import {
  useDeleteHotelMutation,
  useGetAllHotelQuery,
} from "@/redux/api/HotelApi";
import TableComponent from "@/components/UI/TableComponent";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableBody, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface HotelColumn {
  id:
    | "title"
    | "hotelImage"
    | "contactNo"
    | "location"
    | "createdAt"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Hotel = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isLoading } = useGetAllHotelQuery({ ...query });
  const [deleteHotel] = useDeleteHotelMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (isLoading) {
    return <p>Loading..........</p>;
  }

  //@ts-ignore
  const hotels = data?.hotel;

  const handleDelete = (id: string) => {
    deleteHotel(id);
  };

  const columns: HotelColumn[] = [
    { id: "title", label: "Division name", minWidth: 170 },
    { id: "hotelImage", label: "Hotel Image", minWidth: 170 },
    { id: "contactNo", label: "Contact No", minWidth: 170 },
    { id: "location", label: "Location", minWidth: 170 },
    { id: "createdAt", label: "Created At", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 170 },
  ];

    const rows = hotels;

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
            {!!searchTerm && (
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
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Travis Howard"
                            src={row?.hotelImage}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.contactNo}</TableCell>
                        <TableCell>{row?.location}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/place/edit/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <EditIcon />
                              </ButtonComponent>
                            </Link>
                            <Link
                              href={`/admin/place/details/${row?.id}`}
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

export default Hotel;
