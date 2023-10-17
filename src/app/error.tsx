"use client";

import Image from "next/image";
import React from "react";
// import troubleshoot from "../assets/troubleshooting.gif";

const Error = () => {
  return (
    <div className="flex justify-center items-center min-h-screen, text-black, bg: white, px-2">
      <div>
        {/* <Image src={troubleshoot} alt="Something went wrong" width={500} /> */}
        <h1 style={{ textAlign: "center" }}>Some thing went wrong!</h1>
      </div>
    </div>
  );
};

export default Error;
