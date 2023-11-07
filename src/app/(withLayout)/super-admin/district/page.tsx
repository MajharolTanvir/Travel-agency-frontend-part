"use client";

import { useDebounced } from "@/redux/hook";
import Link from "next/link";
import React, { useState } from "react";
import {
  useDeleteDistrictMutation,
  useGetAllDistrictQuery,
} from "@/redux/api/DistrictApi";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableBody, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import CachedIcon from "@mui/icons-material/Cached";
import TableComponent from "@/components/UI/TableComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Spinner from "@/components/UI/Spinner";

export interface HotelColumn {
  id: "title" | "districtImage" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const District = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDistrict] = useDeleteDistrictMutation();
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  
  const { data, isLoading } = useGetAllDistrictQuery({ ...query });
  if (isLoading) {
    return <Spinner />
  }

  //@ts-ignore
  const districts = data?.district;

  const columns: any = [
    { id: "title", label: "Division name" },
    { id: "districtImage", label: "District Image" },
    { id: "createdAt", label: "Created At" },
    { id: "action", label: "Action" },
  ];

  const rows = districts;

  const handleDelete = (id: string) => {
    deleteDistrict(id);
  };

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <BreadcrumbsComponent
        items={[
          {
            label: "Super-Admin",
            link: "/super-admin",
          },
        ]}
      />
      <DetailsTab title="Manage District">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/super-admin/district/create-district">
              <ButtonComponent>Create district</ButtonComponent>
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
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Travis Howard"
                            src={row?.districtImage}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/super-admin/district/edit/${row?.id}`}
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
        )}
      </DetailsTab>
    </div>
  );
};

export default District;
