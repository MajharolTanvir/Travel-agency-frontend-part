import React from 'react'
import TablePagination from "@mui/material/TablePagination";

interface PaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  handleChangeRowsPerPage: any;
  handleChangePage: any;
}

const Pagination = ({
  count,
  rowsPerPage,
    page,
  handleChangeRowsPerPage,
  handleChangePage,
}: PaginationProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination