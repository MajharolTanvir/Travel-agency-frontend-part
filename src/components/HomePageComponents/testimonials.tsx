"use client";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <div className="container m-auto md:px-12 xl:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-violet-700 text-start border-b-2 inline border-violet-700">
        What our customers say
      </h1>
      <div className="grid md:grid-cols-1 gap-3 md:gap-8 lg:grid-cols-2 my-10">
        <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
          <div className="flex md:flex-none justify-center">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
          <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
            <p className="text-gray-600 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              repellat perspiciatis excepturi est. Non ipsum iusto aliquam
              consequatur repellat provident, omnis ut, sapiente voluptates
              veritatis cum deleniti repudiandae ad doloribus. Lorem ipsum dolor
              sit amet consectetur adipisicing elit.
            </p>
            <div>
              <h6 className="text-lg font-semibold leading-none">Jane Doe</h6>
              <span className="text-xs text-gray-500">Product Designer</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8">
          <div className="flex md:flex-none justify-center">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
          <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
            <p className="text-gray-600 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              repellat perspiciatis excepturi est. Non ipsum iusto aliquam
              consequatur repellat provident, omnis ut, sapiente voluptates
              veritatis cum deleniti repudiandae ad doloribus.
            </p>
            <div>
              <h6 className="text-lg font-semibold leading-none">Jane Doe</h6>
              <span className="text-xs text-gray-500">Product Designer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
