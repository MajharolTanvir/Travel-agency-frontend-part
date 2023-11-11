"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TemporaryDrawer from "./drewer";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isLoggedIn, removeUserInfo } from "@/services/auth.services";
import { authKey } from "@/constant/storageKey";

const pages = [
  { label: "Home", link: "/" },
  { label: "District", link: "/district" },
  { label: "Place", link: "/place" },
  { label: "Hotel", link: "/hotel" },
  { label: "Room", link: "/room" },
  { label: "Package", link: "/package" },
];

const Navbar = () => {
  const pathname = usePathname();
  const loggedIn = isLoggedIn();

  const SignOut = () => {
    removeUserInfo(authKey);
  };

  const settings = [
    {
      key: 1,
      label: "Profile",
      link: "/profile",
    },
    { key: 2, label: "Dashboard", link: "/dashboard" },
    !loggedIn
      ? {
          key: 3,
          label: "Login",
          link: "/auth/login",
        }
      : null,
    !loggedIn
      ? {
          key: 4,
          label: "Signup",
          link: "/auth/signup",
        }
      : {
          key: 5,
          label: <button onClick={SignOut}>Sign out</button>,
          link: "/auth/login",
        },
  ].filter(Boolean);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="bg-gradient-to-r from-violet-950 via-violet-700 to-violet-950"
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="flex justify-between items-center w-full">
            <div className="flex md:hidden ">
              <TemporaryDrawer />
              <div className="flex md:hidden">
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="border-2 rounded-full bg-white p-2 mr-2"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                className="border-2 rounded-full bg-white p-2 mr-2"
              />
            </div>
            <Box className="hidden md:flex ">
              {pages.map((page) => (
                <Link key={page.label} href={page.link}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    className={`${
                      pathname === page.link
                        ? "font-bold text-slate-100"
                        : "text-violet-200"
                    } `}
                  >
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box>
              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <Tooltip title="Open settings">
                <IconButton
                  color="inherit"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting: any) => (
                  <MenuItem key={setting?.key} onClick={handleCloseUserMenu}>
                    <Link
                      className={`${
                        pathname === setting?.link
                          ? "font-bold text-violet-700 w-full"
                          : "w-full"
                      } `}
                      href={setting!?.link}
                    >
                      <Typography textAlign="center">
                        {setting?.label}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
