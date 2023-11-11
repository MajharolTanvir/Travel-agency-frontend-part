"use client";
import Link from "next/link";
import React, { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { useGetAllPlaceQuery } from "@/redux/api/PlaceApi";
import { useDebounced } from "@/redux/hook";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { Input, TableCell, TableRow } from "@mui/material";
import TableComponent from "@/components/UI/TableComponent";
import { Avatar } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Spinner from "@/components/UI/Spinner";
import {
  useCreatePackagePlaceMutation,
  useDeletePackagePlaceMutation,
  useGetPackagePlaceQuery,
} from "@/redux/api/PackageApi";
import Swal from "sweetalert2";
import { MdAddLocationAlt, MdOutlineWrongLocation } from "react-icons/md";

export interface PlaceColumn {
  id: "packagePlan" | "title" | "placeImage" | "district" | "createdAt";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const AddPlaces = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const query: Record<string, any> = {};
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [createPackagePlaces] = useCreatePackagePlaceMutation();
  const { data: selectedPlaces } = useGetPackagePlaceQuery({});
  const [deletePackagePlace] = useDeletePackagePlaceMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllPlaceQuery({ ...query });
  if (isLoading) {
    return <Spinner />;
  }

  const packagePlace = selectedPlaces!?.packagePlan?.filter(
    (p: any) => p.packageId === id
  );

  //@ts-ignore
  const places = data?.place;

  const columns: PlaceColumn[] = [
    { id: "packagePlan", label: "Add places", minWidth: 100 },
    { id: "title", label: "Place name", minWidth: 170 },
    { id: "placeImage", label: "Place image", minWidth: 100 },
    { id: "district", label: "District", minWidth: 100 },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 170,
    },
  ];

  const rows = places;

  const resetFilters = () => {
    setSearchTerm("");
  };

  const handleAdd = async (placeId: string) => {
    const values = {
      packageId: id,
      placeId: placeId,
    };
    try {
      const res = await createPackagePlaces(values).unwrap();
      if (res?.id) {
        Swal.fire(
          "Place Added!",
          "Package place added successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Package place failed!", error.data, "error");
    }
  };

  const handleDeleted = async (values: any) => {
    const deleteData = {
      id: values.id,
      packageId: id,
      placeId: values.placeId,
    };
    try {
      const res = deletePackagePlace(deleteData).unwrap();
      console.log(res);
      if (await res) {
        Swal.fire(
          "Place removed!",
          "Package place removed successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("Package place failed!", error.data, "error");
    }
  };

  return (
    <DetailsTab title="Manage Place">
      <div className="md:flex justify-between items-center gap-5 mb-5">
        <Input
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div className="flex justify-between items-center gap-2">
          <Link href="/admin/place/create-place">
            <ButtonComponent>Create Place</ButtonComponent>
          </Link>
          {!!searchTerm && (
            <ButtonComponent onclick={resetFilters}>
              <CachedIcon />
            </ButtonComponent>
          )}
        </div>
      </div>

      {data && (
        <div>
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
                        <TableCell>
                          {row.id ===
                          packagePlace?.filter(
                            (p: any) => p.placeId === row.id
                          )[0]?.placeId ? (
                            <MdOutlineWrongLocation
                              className="text-2xl cursor-pointer"
                              onClick={() =>
                                handleDeleted(
                                  packagePlace?.filter(
                                    (p: any) => p.placeId === row.id
                                  )[0]
                                )
                              }
                            />
                          ) : (
                            <MdAddLocationAlt
                              className="text-2xl cursor-pointer"
                              onClick={() => handleAdd(row.id)}
                            />
                          )}
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          <Avatar
                            alt="Travis Howard"
                            src={row?.placeImage}
                            sx={{ width: 70, height: 70 }}
                            variant="square"
                          />
                        </TableCell>
                        <TableCell>{row?.district?.title}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </TableComponent>
        </div>
      )}
    </DetailsTab>
  );
};

export default AddPlaces;
