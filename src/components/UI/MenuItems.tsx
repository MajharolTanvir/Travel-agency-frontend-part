/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashBoardItems } from "./dashBoardItems";
import { removeUserInfo } from "@/services/auth.services";
import { authKey } from "@/constant/storageKey";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export interface SidebarItem {
  icon: JSX.Element;
  link: string;
  level: string | JSX.Element;
}

const MenuItems = () => {
  const [sideBarItem, setSideBarItem] = useState<SidebarItem[]>([]);
  const router = useRouter();

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/auth/signin");
    Swal.fire("Signout!", "Sign out successfully!", "success");
  };

  useEffect(() => {
    const fetchSideBarItem = async () => {
      const items = DashBoardItems(logout);
      setSideBarItem(items as SidebarItem[]);
    };

    fetchSideBarItem();
  }, []);

  return (
    <div>
      {sideBarItem.map((item: any) => (
        <div key={item.level}>
          <div className="px-5 flex gap-5 cursor-pointer">
            <div className="mt-5 sideBarItem-gray-500 flex justify-center items-center gap-5">
              {item?.icon}
              <Link href={item.link}>{item?.level} </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
