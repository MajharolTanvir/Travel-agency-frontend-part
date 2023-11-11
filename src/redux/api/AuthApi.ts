import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const AUTH_URL = "/users";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    confirmSignup: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/confirm-signup`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forget-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password/?token=${data.query}`,
        method: "POST",
        data: data.values,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.admin, TagTypes.super_admin],
    }),
  }),
});



export const {
  useUserLoginMutation,
  useConfirmSignupMutation,
  useUserSignupMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
