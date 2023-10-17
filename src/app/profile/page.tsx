"use client";

import Navbar from "@/components/Navbar/page";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const { role } = getUserInfo() as UserInfoProps;

  const router = useRouter();

  if (role === undefined) {
    router.push("/auth/login");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Profile;
