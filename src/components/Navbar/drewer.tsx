import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Link from "next/link";
import { IconButton, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";

type Anchor = "left";

const pages = [
  { label: "Home", link: "/" },
  { label: "District", link: "/district" },
  { label: "Room", link: "/room" },
];

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const pathName = usePathname();

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="pt-14 bg-gradient-to-b text-white from-violet-950 via-violet-700 to-violet-950 h-full w-28"
    >
      <List>
        {pages.map((page) => (
          <MenuItem key={page.label}>
            <Link
              href={page.link}
              className={`${
                pathName === page.link ? "font-bold" : "text-violet-200"
              } `}
            >
              <Typography textAlign="center">{page.label}</Typography>
            </Link>
          </MenuItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="md:hidden ">
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
