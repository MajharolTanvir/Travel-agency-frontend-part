"use client";

import { USER_ROLE } from "@/constant/role";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import { authKey } from "@/constant/storageKey";
import Swal from "sweetalert2";
import LogoutIcon from "@mui/icons-material/Logout";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PlaceIcon from "@mui/icons-material/Place";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HouseIcon from "@mui/icons-material/House";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { UserInfoProps } from "@/types";
import ForumIcon from "@mui/icons-material/Forum";

export const DashBoardItems = (logout: any) => {
  const { role } = getUserInfo() as UserInfoProps;

  const defaultSideBar = [
    {
      icon: <PersonOutlineIcon />,
      link: "/profile",
      level: "Profile",
    },
    {
      icon: <LogoutIcon />,
      link: "",
      level: <h2 onClick={logout}>Logout</h2>,
    },
  ];
  const userSideBar = [
    {
      icon: <ForumIcon />,
      link: "/user/feedback",
      level: "Feedback",
    },
    ...defaultSideBar,
  ];

  const adminSideBar = [
    {
      icon: <PlaceIcon />,
      link: "/admin/place",
      level: "Manage Place",
    },
    {
      icon: <EmojiTransportationIcon />,
      link: "/admin/hotel",
      level: "Manage Hotel",
    },
    {
      icon: <HouseIcon />,
      link: "/admin/room",
      level: "Manage Room",
    },
    ...defaultSideBar,
  ];

  const superAdminSideBar = [
    {
      icon: <SupervisorAccountIcon />,
      link: "/super-admin/manage-admins",
      level: "Manage Admins",
    },
    {
      icon: <PersonIcon />,
      link: "/super-admin/manage-users",
      level: "Manage Users",
    },
    {
      icon: <PublicIcon />,
      link: "/super-admin/division",
      level: "Manage Division",
    },
    {
      icon: <AddLocationAltIcon />,
      link: "/super-admin/district",
      level: "Manage District",
    },
    ...adminSideBar,
  ];

  if (role == USER_ROLE.USER) return userSideBar;
  else if (role === USER_ROLE.ADMIN) return adminSideBar;
  else if (role === USER_ROLE.SUPER_ADMIN) return superAdminSideBar;
  else {
    return [
      {
        link: "",
        level: "",
        icon: "",
      },
    ];
  }
};
