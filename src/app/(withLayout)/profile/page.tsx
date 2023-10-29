"use client";

import { useGetProfileQuery } from "@/redux/api/UserApi";
import { Avatar, Divider, Popover, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import ViewFeedback from "@/components/UI/ViewFeedback";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { data, isLoading } = useGetProfileQuery({});
  const { role } = getUserInfo() as UserInfoProps;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (isLoading) {
    <p>Loading....</p>;
  }

  return (
    <div>
      <section className="py-5 mx-auto lg:w-full">
        {data && (
          <div className="m-5">
            <div className="flex justify-start items-start my-3">
              <Link
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                href="/profile/edit"
              >
                <EditIcon />
              </Link>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Update profile</Typography>
              </Popover>
            </div>
            <div className="mt-4 flex flex-col justify-around items-center w-full">
              <Avatar
                alt="Remy Sharp"
                src={data?.Profile[0]?.profileImage}
                sx={{ width: 80, height: 80 }}
                className="mb-4"
              />
              {data?.Profile[0]?.bio && (
                <p className="my-4">{data?.Profile[0]?.bio}</p>
              )}

              <div className="text-lg md:text-2xl lg:text-3xl font-bold gap-3 w-full flex justify-center">
                {data?.firstName && <h1>{data?.firstName}</h1>}
                {data?.middleName && <h1>{data?.middleName}</h1>}
                {data?.lastName && <h1>{data?.lastName}</h1>}
              </div>
            </div>

            <Divider className="bg-violet-700 my-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                {data?.role && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Role: </span>
                    <p>{data?.role}</p>
                  </div>
                )}

                {data?.email && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">email: </span>

                    <p>{data?.email}</p>
                  </div>
                )}

                {data?.Profile[0]?.gender && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Gender: </span>
                    <p>{data?.Profile[0]?.gender}</p>
                  </div>
                )}

                {data?.Profile[0]?.contactNo && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Contact No: </span>
                    <p>{data?.Profile[0]?.contactNo}</p>
                  </div>
                )}

                {data?.Profile[0]?.dateOfBirth && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Date of birth: </span>
                    <p>{data?.Profile[0]?.dateOfBirth}</p>
                  </div>
                )}

                {data?.Profile[0]?.country && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Country: </span>
                    <p>{data?.Profile[0]?.country}</p>
                  </div>
                )}
              </div>

              <div>
                {data?.Profile[0]?.division && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Division: </span>
                    <p>{data?.Profile[0]?.division}</p>
                  </div>
                )}

                {data?.Profile[0]?.district && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">District: </span>
                    <p>{data?.Profile[0]?.district}</p>
                  </div>
                )}

                {data?.Profile[0]?.area && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">area: </span>
                    <p>{data?.Profile[0]?.area}</p>
                  </div>
                )}

                {data?.Profile[0]?.nid && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Nid no: </span>
                    <p>{data?.Profile[0]?.nid}</p>
                  </div>
                )}

                {data?.Profile[0]?.passport && (
                  <div className="py-2 rounded-r-xl shadow pl-5 mb-2">
                    <span className="font-bold  my-1">Passport no: </span>
                    <p>{data?.Profile[0]?.passport}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
      <section>{role === "user" && <ViewFeedback />}</section>
    </div>
  );
};

export default Profile;
