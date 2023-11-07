"use client";

import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { Avatar, Input, TableBody, TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import {
  useDeletePackagePlanMutation,
  useGetAllPackagePlanQuery,
} from "@/redux/api/PackageApi";
import Spinner from "@/components/UI/Spinner";
import { useDebounced } from "@/redux/hook";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableComponent from "@/components/UI/TableComponent";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

export interface HotelColumn {
  id:
    | "packageName"
    | "thumbnail"
    | "travelerSize"
    | "startLocation"
    | "endLocation"
    | "contactManager"
    | "createdAt"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const PackagePage = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deletePackagePlan] = useDeletePackagePlanMutation();
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  
  const { data, isLoading } = useGetAllPackagePlanQuery({ ...query });
  console.log(data)
  if (isLoading) {
    return <Spinner />;
  }

  const columns: HotelColumn[] = [
    { id: "packageName", label: "Package name", minWidth: 170 },
    { id: "thumbnail", label: "Image", minWidth: 170 },
    { id: "travelerSize", label: "Traveler size", minWidth: 170 },
    { id: "startLocation", label: "Start location", minWidth: 170 },
    { id: "endLocation", label: "End location", minWidth: 170 },
    { id: "contactManager", label: "Contact manager", minWidth: 170 },
    { id: "createdAt", label: "Created At", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 170 },
  ];

  //@ts-ignore
  const rows = data?.packagePlan;

  const handleDelete = (id: string) => {
    deletePackagePlan(id);
  };

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <DetailsTab title="Manage Package">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/admin/package/create-package">
              <ButtonComponent>Create Package</ButtonComponent>
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
                        <TableCell>{row.packageName}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Travis Howard"
                            src={row?.thumbnail}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.travelerSize}</TableCell>
                        <TableCell>{row?.startLocation}</TableCell>
                        <TableCell>{row?.endLocation}</TableCell>
                        <TableCell>{row?.contactManager}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/package/add-places/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <AddLocationAltIcon />
                              </ButtonComponent>
                            </Link>
                            <Link
                              href={`/admin/package/edit/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <EditIcon />
                              </ButtonComponent>
                            </Link>
                            <Link
                              href={`/admin/package/details/${row?.id}`}
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

export default PackagePage;
