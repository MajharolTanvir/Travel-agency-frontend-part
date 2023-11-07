"use client";

import React, { useState } from "react";
import { useGetAllProfileQuery } from "@/redux/api/UserApi";
import { useDebounced } from "@/redux/hook";
import TableComponent from "@/components/UI/TableComponent";
import { Column } from "@/types";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import ButtonComponent from "@/components/UI/buttonComponent";
import CachedIcon from "@mui/icons-material/Cached";
import { Input, TableBody, TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Spinner from "@/components/UI/Spinner";

export interface UserColumn {
  id: "firstName" | "middleName" | "lastName" | "email" | "role" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const ManageUser = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllProfileQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  //@ts-ignore
  const users = data?.users;

  const columns: readonly UserColumn[] = [
    { id: "firstName", label: "First Name" },
    { id: "middleName", label: "Middle Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "action", label: "Action" },
  ];

  const rows = users;

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <BreadcrumbsComponent
        items={[
          {
            label: "Super_Admin",
            link: "/super_admin",
          },
        ]}
      />
      <DetailsTab title="Manage user">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            // size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
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
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row?.middleName}</TableCell>
                        <TableCell>{row?.lastName}</TableCell>
                        <TableCell>{row?.email}</TableCell>
                        <TableCell>{row?.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/super-admin/manage-users/details/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <VisibilityIcon />
                              </ButtonComponent>
                            </Link>
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

export default ManageUser;
