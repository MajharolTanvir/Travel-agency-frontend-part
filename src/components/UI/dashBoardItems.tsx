import InboxIcon from "@mui/icons-material/MoveToInbox";
import { USER_ROLE } from "@/constant/role";
import ButtonComponent from "./buttonComponent";
import { useRouter } from "next/navigation";
import { removeUserInfo } from "@/services/auth.services";
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

export const DashBoardItems = (role: string) => {
  const router = useRouter();

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/auth/signin");
    Swal.fire("Signout!", "Sign out successfully!", "success");
  };

  const defaultSideBar = [
    {
      link: "/profile",
      level: "Profile",
      icon: <PersonOutlineIcon />,
    },
    {
      link: "",
      level: <h2 onClick={logout}>Logout</h2>,
      icon: <LogoutIcon />,
    },
  ];
  const userSideBar = [
    // {
    //   link: "/dashboard/User/appointment",
    //   level: "Appointment",
    //   icon: <InboxIcon></InboxIcon>,
    // },
    ...defaultSideBar,
  ];

  const adminSideBar = [
    {
      link: "/admin/place",
      level: "Manage Place",
      icon: <PlaceIcon />,
    },
    {
      link: "/admin/hotel",
      level: "Manage Hotel",
      icon: <EmojiTransportationIcon />,
    },
    {
      link: "/admin/room",
      level: "Manage Room",
      icon: <HouseIcon />,
    },
    ...defaultSideBar,
  ];

  const superAdminSideBar = [
    {
      link: "/super-admin/manage-admins",
      level: "Manage Admins",
      icon: <SupervisorAccountIcon />,
    },
    {
      link: "/super-admin/manage-users",
      level: "Manage Users",
      icon: <PersonIcon />,
    },
    {
      link: "/super-admin/division",
      level: "Manage Division",
      icon: <PublicIcon />,
    },
    {
      link: "/super-admin/district",
      level: "Manage District",
      icon: <AddLocationAltIcon />,
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
