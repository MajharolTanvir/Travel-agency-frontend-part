"use client";

import React, { useState } from "react";
import { useGetAllProfileQuery } from "@/redux/api/UserApi";
import { useDebounced } from "@/redux/hook";
import TableComponent from "@/components/UI/tableComponent";
import { Column } from "@/types";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import DetailsTab from "@/components/UI/detailsTab";
import ButtonComponent from "@/components/UI/buttonComponent";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { TableCell, TableRow } from "@mui/material";
import Link from "next/link";

const ManageUser = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

    const { data, isLoading } = useGetAllProfileQuery({ ...query });
    
    if (isLoading) {
       return <p>Loading......</p>
   }

  //@ts-ignore
  const users = data?.users;
  //@ts-ignore
  const meta = data?.meta;

  const columns: readonly Column[] = [
    { id: "firstName", label: "First Name" },
    { id: "middleName", label: "Middle Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
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
            label: "Super_Admin",
            link: "/super_admin",
          },
        ]}
      />
      <DetailsTab title="Manage user">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <input
            // size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
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
            {users?.map((user: any) => (
              <TableRow
                key={user?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user?.firstName}</TableCell>
                <TableCell align="center">
                  {(user?.middleName && user?.middleName) || ""}
                </TableCell>
                <TableCell align="center"> {user?.lastName}</TableCell>
                <TableCell align="center">{user?.email}</TableCell>
                <TableCell align="center">{user?.role}</TableCell>

                <TableCell align="center">
                  <span className="flex gap-4 justify-center items-center">
                    <Link
                      href={`/super-admin/manage-users/details/${user?.id}`}
                      className="text-blue-500 text-xl"
                    >
                      <RemoveRedEyeIcon />
                    </Link>
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

export default ManageUser;
