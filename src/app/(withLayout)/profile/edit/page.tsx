"use client";

import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormSelectFields from "@/components/Form/FormSelectField";
import ImageUpload from "@/components/Form/UploadSingleImage";
import Navbar from "@/components/Navbar/page";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { genderOptions } from "@/constant/global";
import {
  useGetProfileQuery,
  useProfileUpdateMutation,
} from "@/redux/api/UserApi";
import { Avatar, Container, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { data, isLoading } = useGetProfileQuery({});
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  if (isLoading) {
    <p>Loading....</p>;
  }

  useEffect(() => {
    if (data?.Profile[0]?.profileImage) {
      setImageUrl(data?.Profile[0]?.profileImage);
    }
  }, [data?.Profile]);

  const defaultValues = {
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    bio: data?.Profile[0]?.bio || "",
    country: data?.Profile[0]?.country || "",
    division: data?.Profile[0]?.division || "",
    district: data?.Profile[0]?.district || "",
    area: data?.Profile[0]?.area || "",
    nid: data?.Profile[0]?.nid || "",
    passport: data?.Profile[0]?.passport || "",
    contactNo: data?.Profile[0]?.contactNo || "",
    dateOfBirth: data?.Profile[0]?.dateOfBirth,
    gender: data?.Profile[0]?.gender || "male",
  };

  const [profileUpdate] = useProfileUpdateMutation();

  const onSubmit = async (data: any) => {
    data.profileImage = imageUrl && imageUrl;
    try {
      const res = await profileUpdate(data);
      if (!!res) {
        Swal.fire("Signup successful!", "User update successfully", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  return (
    <section>
      <Container maxWidth="xl">
        <BreadcrumbsComponent
          items={[
            {
              label: "Profile",
              link: "/profile",
            },
          ]}
        />
        <DetailsTab title="Update profile">
          <section>
            <div className="rounded-2xl p-10 shadow-md">
              <Form submitHandler={onSubmit} defaultValues={defaultValues}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 w-full">
                    <ImageUpload
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                    ></ImageUpload>
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      size="large"
                      name="firstName"
                      label="First Name"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      size="large"
                      name="middleName"
                      label="Middle Name"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="lastName"
                      size="large"
                      label="Last Name"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="bio"
                      size="large"
                      label="Bio"
                    />
                  </div>

                  <div className="w-full">
                    <FormSelectFields
                      name="gender"
                      label="Gender"
                      options={genderOptions}
                      placeholder="Male"
                    />
                  </div>

                  <div className="w-full">
                    <FormDatePicker name="dateOfBirth" label="Date of Birth" />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="country"
                      size="large"
                      label="Country"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="division"
                      size="large"
                      label="Division"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="district"
                      size="large"
                      label="District"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="area"
                      size="large"
                      label="Area"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="nid"
                      size="large"
                      label="NID"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="passport"
                      size="large"
                      label="Passport No"
                    />
                  </div>

                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="contactNo"
                      size="large"
                      label="Contact No"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
                  <ButtonComponent>Submit</ButtonComponent>
                </div>
              </Form>
            </div>
          </section>
        </DetailsTab>
      </Container>
    </section>
  );
};

export default UpdateProfile;
