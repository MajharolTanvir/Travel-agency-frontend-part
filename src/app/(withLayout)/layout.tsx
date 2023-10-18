import DashboardLayout from "@/components/UI/dashBoardLayout";
import React from "react";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
          <DashboardLayout>
              {children}
          </DashboardLayout>
    </>
  );
};

export default DashboardRootLayout;
