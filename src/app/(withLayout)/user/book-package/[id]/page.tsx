"use client";
import Form from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import Spinner from "@/components/UI/Spinner";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useCreateBookedPackageMutation } from "@/redux/api/BookedPackageApi";
import { useGetSinglePackagePlanQuery } from "@/redux/api/PackageApi";
import { getUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

type IDProps = {
  params: {
    id: string;
  };
};

const BookPackage = ({ params }: IDProps) => {
  const { id } = params;
  const { userId } = getUserInfo() as UserInfoProps;

  const { data, isLoading } = useGetSinglePackagePlanQuery(id);
  const [createBookedPackage] = useCreateBookedPackageMutation();
  const [memberCount, setMemberCount] = useState<number>(1);
  const router = useRouter()

  if (isLoading) {
    return <Spinner />;
  }
  const onSubmit = async (value: any) => {
    value.userId = userId;
    value.packageId = id;
    value.travelingMember = memberCount;
    value.totalCost = data.bookingCost * memberCount;

    try {
      const res:any = await createBookedPackage(value).unwrap();
      if (res.clientSecret) {
        // Swal.fire("Package Booked!", "Package booked successfully!", "success");
        localStorage.setItem('packageId', res?.id)
        router.push(`/user/book-package/payment/?token=${res.clientSecret}&payment=${value.totalCost}`);
      }

    } catch (error: any) {
      Swal.fire("Package booked failed!", error.data, "error");
    }
  };

  const handleChange = (e: any) => {
    setMemberCount(parseInt(e.target.value));
  };

  return (
    <DetailsTab title="Booked package">
      <div>
        <h3 className="text-xl">Per person cost: {data.bookingCost}</h3>
      </div>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start gap-5">
          <div>
            <TextField
              className="w-full"
              name="travelingMember"
              label="How many sit you want?"
              variant="standard"
              type="number"
              defaultValue="1"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <FormInput
              name="totalCost"
              label="Per person cost"
              size="large"
              type="text"
              value={data.bookingCost * memberCount}
            />
          </div>
          <div>
            <FormInput
              name="contactNo"
              label="Contact no"
              size="large"
              type="text"
            />
          </div>
          <div>
            <FormInput
              name="emergencyContactNo"
              label="Emergency contact no"
              size="large"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          <ButtonComponent>Submit</ButtonComponent>
        </div>
      </Form>
    </DetailsTab>
  );
};

export default BookPackage;
