"use client";

import Link from "next/link";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CachedIcon from "@mui/icons-material/Cached";
import dayjs from "dayjs";
import {
  useDeletePlaceMutation,
  useGetAllPlaceQuery,
} from "@/redux/api/PlaceApi";
import { useDebounced } from "@/redux/hook";
import ButtonComponent from "@/components/UI/buttonComponent";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableCell, TableRow } from "@mui/material";
import TableComponent from "@/components/UI/tableComponent";

const Place = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deletePlace] = useDeletePlaceMutation();

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

  const { data, isLoading } = useGetAllPlaceQuery({ ...query });
  //@ts-ignore
  const places = data?.place;
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    deletePlace(id);
  };

  const columns: any = [
    { id: "title", label: "Division name" },
    { id: "districtImage", label: "District Image" },
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
      <DetailsTab title="Manage Place">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/admin/place/create-place">
              <ButtonComponent>Create Place</ButtonComponent>
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
            {places?.map((place: any) => (
              <TableRow
                key={place?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{place?.title}</TableCell>
                <TableCell
                  align="center"
                  className="flex justify-center items-center"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={place?.placeImage}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>

                <TableCell align="center">{place?.createdAt}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    {/* <Link
                      href={`/admin/place/details/${place?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <RemoveRedEyeIcon />
                    </Link> */}
                    <Link
                      href={`/admin/place/edit/${place?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <EditIcon />
                    </Link>
                    <ButtonComponent onclick={() => handleDelete(place?.id)}>
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

export default Place;
