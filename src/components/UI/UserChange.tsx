"use client";

import { useChangeRoleMutation } from "@/redux/api/UserApi";
import { getUserInfo } from "@/services/auth.services";
import React from "react";
import FormSelectFields from "../Form/FormSelectField";
import Form from "../Form/Form";
import ButtonComponent from "./buttonComponent";
import Swal from "sweetalert2";
import { userRole } from "@/constant/global";

const UserChange = ({ id }: any) => {
  const [changeRole] = useChangeRoleMutation(id);
  const { role } = getUserInfo() as any;

  const onSubmit = async (values: any) => {
    try {
      const roleData = {
        id: id,
        values: values,
      };
      const res = await changeRole(roleData);

      if (!!res) {
        Swal.fire("Role changed", "User role update successfully!", "success");
      }
    } catch (error: any) {
      Swal.fire("Signup failed!", error.message, "error");
    }
  };

  return (
    <div>
      {role === "super_admin" && (
        <div>
          <Form submitHandler={onSubmit}>
            <FormSelectFields
              name="role"
              label="Role"
              options={userRole}
              placeholder="User"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
              <ButtonComponent>Submit</ButtonComponent>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UserChange;
