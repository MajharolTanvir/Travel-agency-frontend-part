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
import { Avatar, Input, TableCell, TableRow } from "@mui/material";
import ButtonComponent from "@/components/UI/buttonComponent";
import CachedIcon from "@mui/icons-material/Cached";
import TableComponent from "@/components/UI/tableComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const District = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteDistrict] = useDeleteDistrictMutation();

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

  const { data, isLoading } = useGetAllDistrictQuery({ ...query });

  if (isLoading) {
    return <p>Loading......</p>;
  }

  //@ts-ignore
  const districts = data?.district;
  //@ts-ignore
  const meta = data?.meta;

  const columns: any = [
    { id: "title", label: "Division name" },
    { id: "districtImage", label: "District Image" },
    { id: "createdAt", label: "Created At" },
    { id: "action", label: "Action" },
  ];

  const handleDelete = (id: string) => {
    deleteDistrict(id);
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
            {districts?.map((district: any) => (
              <TableRow
                key={district?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{district?.title}</TableCell>
                <TableCell align="center" className="flex justify-center items-center">
                  <Avatar
                    alt="Remy Sharp"
                    src={district?.districtImage}
                    sx={{ width: 80, height: 80 }}
                  />
                </TableCell>

                <TableCell align="center">{district?.createdAt}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    <Link
                      href={`/super-admin/district/edit/${district?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <EditIcon />
                    </Link>
                    <ButtonComponent onclick={() => handleDelete(district?.id)}>
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

export default District;
