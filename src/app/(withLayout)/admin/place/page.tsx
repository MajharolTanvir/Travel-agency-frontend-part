"use client";
import Link from "next/link";
import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import {
  useDeletePlaceMutation,
  useGetAllPlaceQuery,
} from "@/redux/api/PlaceApi";
import { useDebounced } from "@/redux/hook";
import ButtonComponent from "@/components/UI/buttonComponent";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Input, TableCell, TableRow } from "@mui/material";
import TableComponent from "@/components/UI/TableComponent";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import Spinner from "@/components/UI/Spinner";

export interface PlaceColumn {
  id: "title" | "placeImage" | "district" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Place = () => {
  const query: Record<string, any> = {};
  const [deletePlace] = useDeletePlaceMutation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllPlaceQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const places = data?.place;

  const handleDelete = (id: string) => {
    deletePlace(id);
  };

  const columns: PlaceColumn[] = [
    { id: "title", label: "Place name", minWidth: 170 },
    { id: "placeImage", label: "Place image", minWidth: 100 },
    { id: "district", label: "District", minWidth: 100 },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 170,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
    },
  ];

  const rows = places;

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
            {!!searchTerm && (
              <ButtonComponent onclick={resetFilters}>
                <CachedIcon />
              </ButtonComponent>
            )}
          </div>
        </div>

        {data && (
          <div>
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
                                href={`/admin/place/edit/${row?.id}`}
                                className="text-blue-500 text-xl"
                              >
                                <ButtonComponent>
                                  <EditIcon />
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
          </div>
        )}
      </DetailsTab>
    </div>
  );
};

export default Place;
