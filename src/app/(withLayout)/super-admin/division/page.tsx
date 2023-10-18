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
import { Input, TableCell, TableRow } from "@mui/material";
import TableComponent from "@/components/UI/tableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";

const Division = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteDivision] = useDeleteDivisionMutation();

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

  const { data, isLoading } = useGetAllDivisionQuery({ ...query });

  if (isLoading) {
    return <p>Loading......</p>;
  }

  //@ts-ignore
  const divisions = data?.division;
  //@ts-ignore
  const meta = data?.meta;

  const columns: any = [
    { id: "title", label: "Division name" },
    { id: "createdAt", label: "Created At" },
    { id: "action", label: "Action" },
  ];

  const handleDelete = (id: string) => {
    deleteDivision(id);
  };

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
            {divisions?.map((division: any) => (
              <TableRow
                key={division?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{division?.title}</TableCell>
                <TableCell align="center">{division?.createdAt}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    {/* <Link
                      href={`/super-admin/division/details/${division?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <RemoveRedEyeIcon />
                    </Link> */}
                    <Link
                      href={`/super-admin/division/edit/${division?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <EditIcon />
                    </Link>
                    <ButtonComponent onclick={() => handleDelete(division?.id)}>
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

export default Division;
