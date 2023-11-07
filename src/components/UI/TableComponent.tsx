import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PlaceColumn } from "@/app/(withLayout)/admin/place/page";
import Pagination from "./TablePagination";

interface TableProps {
  columns: any;
  rows: any;
  children: React.ReactNode;
  page: number;
  setPage: any;
  setRowsPerPage: any;
  rowsPerPage: any;
}

export default function StickyHeadTable({
  columns,
  rows,
  page,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  children,
}: TableProps) {

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer className="max-w-[220px] sm:max-w-xl md:max-w-full">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {children}
        </Table>
      </TableContainer>
      <Pagination
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      ></Pagination>
    </Paper>
  );
}
