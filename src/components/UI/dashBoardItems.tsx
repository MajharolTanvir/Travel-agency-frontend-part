"use client";

import { USER_ROLE } from "@/constant/role";
import { getUserInfo } from "@/services/auth.services";
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
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

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
      link: "/",
      level: <h2 onClick={logout}>Logout</h2>,
    },
  ];
  const traveler_SideBar = [
    {
      icon: <BookmarkAddedIcon />,
      link: "/user/book-package/manage-package",
      level: "View bookings",
    },
    {
      icon: <ForumIcon />,
      link: "/user/feedback",
      level: "Feedback",
    },
    ...defaultSideBar,
  ];

  const support_SideBar = [
    {
      icon: <BookmarkAddedIcon />,
      link: "/user/book-package/manage-package",
      level: "View bookings",
    },
    ...defaultSideBar,
  ];

  const guide_SideBar = [
    {
      icon: <BookmarkAddedIcon />,
      link: "/user/book-package/manage-package",
      level: "View bookings",
    },
    {
      icon: <RssFeedIcon />,
      link: "/admin/blog",
      level: "Blog",
    },
    ...defaultSideBar,
  ];

  const manager_SideBar = [
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
    {
      icon: <PlaceIcon />,
      link: "/admin/place",
      level: "Manage Place",
    },
    ...defaultSideBar,
  ];

  const district_coordinator_sideBar = [
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
    ...defaultSideBar,
  ];

  const admin_sideBar = [
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
    {
      icon: <PlaceIcon />,
      link: "/admin/place",
      level: "Manage Place",
    },
    {
      icon: <Inventory2Icon />,
      link: "/admin/package",
      level: "Manage Package",
    },
    {
      icon: <BookmarkAddedIcon />,
      link: "/user/book-package/manage-package",
      level: "View bookings",
    },
    {
      icon: <ForumIcon />,
      link: "/admin/feedback",
      level: "Feedback",
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
      icon: <SupervisorAccountIcon />,
      link: "/super-admin/manage-coordinator",
      level: "Manage coordinator",
    },
    {
      icon: <SupervisorAccountIcon />,
      link: "/super-admin/manage-guide",
      level: "Manage Guide",
    },
    {
      icon: <PersonIcon />,
      link: "/super-admin/manage-users",
      level: "Manage Users",
    },
    {
      icon: <RssFeedIcon />,
      link: "/admin/blog",
      level: "Manage Blog",
    },
    ...admin_sideBar,
  ];

  if (role == USER_ROLE.TRAVELER) return traveler_SideBar;
  else if (role == USER_ROLE.GUIDE) return guide_SideBar;
  else if (role === USER_ROLE.DISTRICT_COORDINATOR)
    return district_coordinator_sideBar;
  else if (role === USER_ROLE.SUPPORT) return support_SideBar;
  else if (role === USER_ROLE.MANAGERS) return manager_SideBar;
  else if (role === USER_ROLE.ADMIN) return admin_sideBar;
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
