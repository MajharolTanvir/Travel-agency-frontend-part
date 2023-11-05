"use client";

import DetailsTab from "@/components/UI/detailsTab";
import { useDeleteBlogMutation, useGetAllBlogQuery } from "@/redux/api/BlogApi";
import React, { useState } from "react";
import ButtonComponent from "@/components/UI/buttonComponent";
import Link from "next/link";
import Spinner from "@/components/UI/Spinner";
import { Avatar, Input, TableBody, TableCell, TableRow } from "@mui/material";
import { useDebounced } from "@/redux/hook";
import CachedIcon from "@mui/icons-material/Cached";
import TableComponent from "@/components/UI/TableComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface HotelColumn {
  id:
    | "title"
    | "thumbnail"
    | "createdAt"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Blog = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isLoading } = useGetAllBlogQuery({...query});
  const [deleteBlog] = useDeleteBlogMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const blogs = data?.blog;

  const columns: HotelColumn[] = [
    { id: "title", label: "Blog Title", minWidth: 170 },
    { id: "thumbnail", label: " Image", minWidth: 170 },
    { id: "createdAt", label: "Created At", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 170 },
  ];

   const rows = blogs;

  const handleDelete = (id: string) => {
    deleteBlog(id);
  };

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <DetailsTab title="Manage Blog">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            <Link href="/admin/blog/create-blog">
              <ButtonComponent>Create Blog</ButtonComponent>
            </Link>
            {!!searchTerm && (
              <ButtonComponent onclick={resetFilters}>
                <CachedIcon />
              </ButtonComponent>
            )}
          </div>
        </div>
        <div>
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
                            src={row?.thumbnail}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/blog/edit/${row?.id}`}
                              className="text-blue-500 text-xl"
                            >
                              <ButtonComponent>
                                <EditIcon />
                              </ButtonComponent>
                            </Link>
                            <Link
                              href={`/admin/blog/details/${row?.id}`}
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
        </div>
      </DetailsTab>
    </div>
  );
};

export default Blog;
