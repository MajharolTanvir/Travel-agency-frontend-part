"use client";
import Form from "@/components/Form/Form";
import FormDatePicker from "@/components/Form/FormDatePicker";
import FormInput from "@/components/Form/FormInput";
import FormTextArea from "@/components/Form/FormTextArea";
import ImageUpload from "@/components/Form/UploadSingleImage";
import BreadcrumbsComponent from "@/components/UI/breadCrumb";
import ButtonComponent from "@/components/UI/buttonComponent";
import DetailsTab from "@/components/UI/detailsTab";
import { useCreatePackagePlanMutation } from "@/redux/api/PackageApi";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CreatePackage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createPackagePlan] = useCreatePackagePlanMutation({});

  const onSubmit = async (data: any) => {
    data.travelerSize = parseInt(data.travelerSize)
    data.bookingCost = parseInt(data.bookingCost);
    data.thumbnail = imageUrl && imageUrl;

    try {
      const res = await createPackagePlan(data).unwrap();
      console.log(res)
      if (res?.data?.id) {
        Swal.fire(
          "PackagePlan Created!",
          "PackagePlan created successfully!",
          "success"
        );
      }
    } catch (error: any) {
      Swal.fire("PackagePlan failed!", error.message, "error");
    }
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
      <DetailsTab title="Create Room">
        <div>
          <Form submitHandler={onSubmit}>
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
                  imageUrl={imageUrl}
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
