"use client";

import DetailsTab from "@/components/UI/detailsTab";
import { useGetAllBlogQuery } from "@/redux/api/BlogApi";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonComponent from "@/components/UI/buttonComponent";
import Link from "next/link";
import TableComponent from "@/components/UI/TableComponent";

const Blog = () => {
  const { data, isLoading } = useGetAllBlogQuery({});
  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const blogs = data?.blog;

  return (
    <div>
      <DetailsTab title="Manage Blog">
        <div>
          {/* {blogs!.map((blog) => (
            <TableComponent key={blog.id} />
          ))} */}
        </div>
      </DetailsTab>
    </div>
  );
};

export default Blog;
