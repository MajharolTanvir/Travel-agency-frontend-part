import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BookedPackage = ({ bookedPackages }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package name</TableCell>
            <TableCell align="center">Payment status</TableCell>
            <TableCell align="center">Booked traveling member</TableCell>
            <TableCell align="center">Package total cost</TableCell>
            <TableCell align="center">Package manager</TableCell>
            <TableCell align="center">Journey start date</TableCell>
            <TableCell align="center">Journey start location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedPackages?.map((pack: any) => (
            <TableRow
              key={pack.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {pack.packagePlan.packageName}
              </TableCell>
              <TableCell align="center">{pack.payment}</TableCell>
              <TableCell align="center">{pack.travelingMember}</TableCell>
              <TableCell align="center">{pack.totalCost}</TableCell>
              <TableCell align="center">
                {pack.packagePlan.contactManager}
              </TableCell>
              <TableCell align="center">{pack.packagePlan.startDate}</TableCell>
              <TableCell align="center">
                {pack.packagePlan.startLocation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookedPackage