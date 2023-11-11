"use client";

import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import Spinner from "@/components/UI/Spinner";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import {
  useGetSinglePackagePlanQuery,
  useUpdatedPackagePlanMutation,
} from "@/redux/api/PackageApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ParamsProps {
  params: any;
}

const CreatePackage = ({ params }: ParamsProps) => {
  const { id } = params;
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [updatedPackagePlan] = useUpdatedPackagePlanMutation({});
  const { data, isLoading } = useGetSinglePackagePlanQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = async (values: any) => {
    values.travelerSize = parseInt(values.travelerSize);
    values.bookingCost = parseInt(values.bookingCost);
    values.thumbnail = imageUrl !== undefined ? imageUrl : data.thumbnail;

    const value = {
      id: id,
      values: values,
    };

    try {
      const res = await updatedPackagePlan(value).unwrap();
      if (res?.id) {
        Swal.fire(
          "PackagePlan updated!",
          "PackagePlan updated successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("PackagePlan failed!", error.data, "error");
    }
  };

  const defaultValues = {
    packageName: data?.packageName || "",
    description: data?.description || "",
    travelerSize: data?.travelerSize || 0,
    startLocation: data?.startLocation || "",
    endLocation: data?.endLocation || "",
    contactManager: data?.contactManager || "",
    bookingCost: data?.bookingCost || 0,
    startDate: data?.startDate,
    endDate: data?.endDate,
  };

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <BreadcrumbsComponent
          items={[
            {
              label: "Admin",
              link: "/admin",
            },
            {
              label: "Manage Package plan",
              link: "/admin/package",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update Room">
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start gap-5">
              <div>
                <FormInput
                  name="packageName"
                  label="Package name"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="travelerSize"
                  label="Traveler size"
                  size="large"
                  type="number"
                />
              </div>

              <div>
                <FormInput
                  name="startLocation"
                  label="Journey Start Location"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="endLocation"
                  label="Journey end Location"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="contactManager"
                  label="Manager contact no"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="bookingCost"
                  label="Travel cost"
                  size="large"
                  type="number"
                />
              </div>

              <div>
                <FormDatePicker name="startDate" label="Start date" />
              </div>

              <div>
                <FormDatePicker name="endDate" label="End date" />
              </div>

              <div>
                <FormTextArea rows={4} name="description" label="Description" />
              </div>

              <div>
                <ImageUpload
                  imageUrl={imageUrl !== undefined ? imageUrl : data.thumbnail}
                  setImageUrl={setImageUrl}
                ></ImageUpload>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
              <ButtonComponent>Submit</ButtonComponent>
            </div>
          </Form>
        </div>
      </DetailsTab>
    </div>
  );
};

export default CreatePackage;
