"use client";

import { useGetAllBlogQuery } from "@/redux/api/BlogApi";
import React from "react";
import ButtonComponent from "../UI/buttonComponent";
import Image from "next/image";
import { Avatar, Divider } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Spinner from "../UI/Spinner";

const Blog = () => {
  const { data, isLoading } = useGetAllBlogQuery({});
  if (isLoading) {
    return <Spinner />;
  }

  const blogs = data?.blog?.slice(0, 3);

  return (
    <div className="my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start border-b-2 inline border-violet-700">
        Our blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full mx-auto gap-2 md:gap-5 lg:gap-10 shadow-md p-5 my-20">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt="Blog image"
            width={300}
            height={300}
            className="w-full relative -top-10"
          />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl xl:text-3xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, eaque.
          </h3>
          <div className="flex bg-violet-700 text-white p-1 my-2 gap-3 rounded-full justify-center md:justify-start">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 30, height: 30 }}
            />
            <div className="md:flex justify-start gap-5 items-center text-md lg:text-lg xl:text-xl">
              <h4 className="font-bold">Lorem ipsum</h4>
              <p>20-04-2023</p>
            </div>
          </div>
          <Divider className="my-2" />
          <p className="text-justify text-md xl:text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
            sit doloribus accusamus saepe ipsam et optio voluptate voluptas!
            Debitis quas dolor magnam, laborum et modi porro excepturi tenetur
            quo culpa eaque dolorem aut officia rem doloribus, facilis ut minima
            atque cum quidem perspiciatis obcaecati deserunt. Quod culpa beatae
            ea non? atque cum quidem perspiciatis obcaecati deserunt. Quod culpa
            beatae ea non?atque cum quidem perspiciatis obcaecati deserunt. Quod
            culpa beatae ea non?
          </p>
          <div className="flex justify-end items-center">
            <ButtonComponent>
              <RemoveRedEyeIcon />
            </ButtonComponent>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <ButtonComponent>View all</ButtonComponent>
      </div>
    </div>
  );
};

export default Blog;
