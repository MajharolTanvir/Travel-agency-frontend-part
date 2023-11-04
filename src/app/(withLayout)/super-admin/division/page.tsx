"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  useDeleteDivisionMutation,
  useGetAllDivisionQuery,
} from "@/redux/api/DivisionApi";
import { useDebounced } from "@/redux/hook";
import ButtonComponent from "@/components/UI/buttonComponent";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import { Input, TableBody, TableCell, TableRow } from "@mui/material";
import TableComponent from "@/components/UI/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";

export interface DivisionColumn {
  id: "title" | "createdAt" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Division = () => {
  const query: Record<string, any> = {};
  const [deleteDivision] = useDeleteDivisionMutation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isLoading } = useGetAllDivisionQuery({ ...query });

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (isLoading) {
    return <p>Loading......</p>;
  }

  //@ts-ignore
  const divisions = data?.division;

  const columns: DivisionColumn[] = [
    { id: "title", label: "Division name" },
    { id: "createdAt", label: "Created At" },
    { id: "action", label: "Action" },
  ];

  const rows = divisions;

  const handleDelete = (id: string) => {
    deleteDivision(id);
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
      <DetailsTab title="Manage Division">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />

          <div className="flex justify-between items-center gap-2">
            <Link href="/super-admin/division/create-division">
              <ButtonComponent>Create division</ButtonComponent>
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
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/super-admin/division/edit/${row?.id}`}
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

export default Division;
