import Image from "next/image";
import React from "react";
// import errorImage from "../assets/Error.gif";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div>
        {/* <Image src={errorImage} width={600} alt="Error image" /> */}
        <h2 style={{ textAlign: "center", color: "white" }}>
          404!!! Not found!
        </h2>
        <h3 style={{ textAlign: "center", padding: "10px 0" }}>
          <a href="/">Go back to home page</a>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
