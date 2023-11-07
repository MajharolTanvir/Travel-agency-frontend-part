import { IHotel, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PACKAGE_PLAN_URL = "/package-plan";

export const packagePlanApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPackagePlan: build.mutation({
      query: (Data) => ({
        url: `${PACKAGE_PLAN_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.packagePlan],
    }),

    getAllPackagePlan: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PACKAGE_PLAN_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta[]) => {
        return {
          packagePlan: response,
          meta,
        };
      },
      providesTags: [TagTypes.packagePlan],
    }),

    getSinglePackagePlan: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PACKAGE_PLAN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.packagePlan],
    }),

    updatedPackagePlan: build.mutation({
      query: (Data) => ({
        url: `${PACKAGE_PLAN_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.packagePlan],
    }),

    deletePackagePlan: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${PACKAGE_PLAN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.packagePlan],
    }),

    createPackagePlace: build.mutation({
      query: (Data) => ({
        url: `${PACKAGE_PLAN_URL}/package-places`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.packagePlan],
    }),

    getPackagePlace: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${PACKAGE_PLAN_URL}/package-places`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta[]) => {
        return {
          packagePlan: response,
          meta,
        };
      },
      providesTags: [TagTypes.packagePlan],
    }),

    deletePackagePlace: build.mutation({
      query: (data) => ({
        url: `${PACKAGE_PLAN_URL}/delete-place/${data.id}`,
        method: "DELETE",
        data: data,
      }),
      invalidatesTags: [TagTypes.packagePlan],
    }),
  }),
});

export const {
  useCreatePackagePlanMutation,
  useGetAllPackagePlanQuery,
  useGetSinglePackagePlanQuery,
  useUpdatedPackagePlanMutation,
  useDeletePackagePlanMutation,
  useCreatePackagePlaceMutation,
  useGetPackagePlaceQuery,
  useDeletePackagePlaceMutation,
} = packagePlanApi;
