"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { TablePagination } from "@mui/material";

const TableComponent = ({
  handleChangeRowsPerPage,
  handleChangePage,
  limit,
  page,
  meta,
  columns,
  children,
}: any) => {
  return (
    <TableContainer component={Paper}>
      <div className="w-56 lg:w-full ">
        <Table
          sx={{ minWidth: 650, overflow: "hidden" }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "#30029010 " }}>
            <TableRow>
              {columns.map((column: { id: React.Key; label: string }) => (
                <TableCell key={column.id} align="center">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
        <div className=" flex justify-center items-center h-12  bg-[#30029010] mt-2 ">
          <TablePagination
            component="div"
            count={meta?.total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </TableContainer>
  );
};

export default TableComponent;
