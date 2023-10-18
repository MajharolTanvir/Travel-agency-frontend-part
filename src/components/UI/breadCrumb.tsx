import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

const BreadcrumbsComponent = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  return (
    <div role="presentation" className="my-5">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        {items.map((item) => (
          <Link
            key={item.label}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={item.link}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
