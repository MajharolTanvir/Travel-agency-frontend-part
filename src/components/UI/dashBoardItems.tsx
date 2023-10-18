import InboxIcon from "@mui/icons-material/MoveToInbox";
import { USER_ROLE } from "@/constant/role";

const defaultSideBar = [
  {
    link: "/profile",
    level: "Profile",
    icon: <InboxIcon></InboxIcon>,
  },
  // {
  //   link: "/",
  //   level: "Change Password",
  //   icon: <MailIcon></MailIcon>,
  // },
  // {
  //   link: "/",
  //   level: "My Activities",
  //   icon: <MailIcon></MailIcon>,
  // },
];
const userSideBar = [
  ...defaultSideBar,
  {
    link: "/dashboard/User/appointment",
    level: "Appointment",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/dashboard/User/myDonorRequest",
    level: "Donor Request",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/dashboard/User/joinDoctor",
    level: "Join Doctor",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/dashboard/User/prescription",
    level: "Prescription",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/dashboard/User/payment",
    level: "Payment Details",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/dashboard/User/history",
    level: "History",
    icon: <InboxIcon></InboxIcon>,
  },
];

const adminSideBar = [
  {
    link: "/admin/place",
    level: "Manage Place",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/admin/hotel",
    level: "Manage Hotel",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/admin/room",
    level: "Manage Room",
    icon: <InboxIcon></InboxIcon>,
  },
];

const superAdminSideBar = [
  {
    link: "/super-admin/manage-admins",
    level: "Manage Admins",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/super-admin/manage-users",
    level: "Manage Users",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/super-admin/division",
    level: "Manage Division",
    icon: <InboxIcon></InboxIcon>,
  },
  {
    link: "/super-admin/district",
    level: "Manage District",
    icon: <InboxIcon></InboxIcon>,
  },
  ...adminSideBar,
];

export const DashBoardItems = (role: string) => {
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
