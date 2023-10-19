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

const Blog = () => {
  const { data, isLoading } = useGetAllBlogQuery({});
  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const blogs = data?.blog;
  console.log(blogs);

  return (
    <div>
      <DetailsTab title="Manage Blog">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs!.map((blog) => (
            <Card key={blog.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={blog?.thumbnail}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog?.description.slice(0, 250)}
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonComponent>View details</ButtonComponent>
                <Link href={`/admin/blog/edit/${blog?.id}`}>
                  <ButtonComponent>Edit blog</ButtonComponent>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </DetailsTab>
    </div>
  );
};

export default Blog;
