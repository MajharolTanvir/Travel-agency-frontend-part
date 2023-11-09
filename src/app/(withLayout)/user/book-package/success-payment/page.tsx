"use client";
import { useUpdateBookedPackageMutation } from "@/redux/api/BookedPackageApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPayment = () => {
  const [updateBookedPackage] = useUpdateBookedPackageMutation();
  const router = useRouter();

  useEffect(() => {
    const packageId = localStorage.getItem("packageId");
    const paymentSuccess = async () => {
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

      const data = {
        id: packageId,
        values: {
          transactionId: randomNumber,
          payment: "Success",
        },
      };
      const res = await updateBookedPackage(data).unwrap();
      if (res?.id) {
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    };
    paymentSuccess();
  }, [router, updateBookedPackage]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h4 className="text-3xl">Payment success</h4>
    </div>
  );
};

export default SuccessPayment;
