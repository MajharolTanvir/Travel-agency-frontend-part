"use client";
import Spinner from "@/components/UI/Spinner";
import { useDeleteBookedPackageMutation, useGetAllBookedPackageQuery } from "@/redux/api/BookedPackageApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookedPackage from "./bookedPackage";
import ButtonComponent from "@/components/UI/buttonComponent";
import DeleteIcon from "@mui/icons-material/Delete";

const ManagePackage = () => {
  const { userId, role } = getUserInfo() as UserInfoProps;
  const { data, isLoading } = useGetAllBookedPackageQuery({});
  const [deleteBookedPackage] = useDeleteBookedPackageMutation();
  
  if (isLoading) return <Spinner />;
  const packages = data?.bookedPackage;
  const bookedPackages = packages?.filter((p: any) => p.userId === userId);

  const handleDelete = (id: string) => {
    deleteBookedPackage(id);
  };


  return (
    <div>
      {role !== "super_admin" ? (
        <BookedPackage bookedPackages={bookedPackages} />
      ) : (
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
                {role === "super_admin" && (
                  <TableCell align="center">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {packages?.map((pack: any) => (
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
                  <TableCell align="center">
                    {pack.packagePlan.startDate}
                  </TableCell>
                  <TableCell align="center">
                    {pack.packagePlan.startLocation}
                  </TableCell>
                  {pack.payment !== "Success" && (
                    <TableCell align="center">
                      <ButtonComponent onclick={() => handleDelete(pack?.id)}>
                        <DeleteIcon />
                      </ButtonComponent>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManagePackage;
