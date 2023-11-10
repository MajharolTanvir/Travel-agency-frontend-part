import { IDivision, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKED_PACKAGE_URL = "/booked-package";

export const bookedPackageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBookedPackage: build.mutation({
      query: (data) => ({
        url: `${BOOKED_PACKAGE_URL}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.bookedPackage],
    }),

    getAllBookedPackage: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BOOKED_PACKAGE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta[]) => {
        return {
          bookedPackage: response,
          meta,
        };
      },
      providesTags: [TagTypes.bookedPackage],
    }),

    getSingleBookedPackage: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKED_PACKAGE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.bookedPackage],
    }),

    updateBookedPackage: build.mutation({
      query: (Data) => ({
        url: `${BOOKED_PACKAGE_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.bookedPackage],
    }),

    deleteBookedPackage: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKED_PACKAGE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.bookedPackage],
    }),
  }),
});

export const {
  useCreateBookedPackageMutation,
  useGetAllBookedPackageQuery,
  useGetSingleBookedPackageQuery,
  useUpdateBookedPackageMutation,
  useDeleteBookedPackageMutation,
} = bookedPackageApi;
