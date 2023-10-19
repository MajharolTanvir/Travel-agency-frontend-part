import { IDivision, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blog";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (Data) => ({
        url: `${BLOG_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    getAllBlog: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BLOG_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDivision[], meta: IMeta[]) => {
        return {
          blog: response,
          meta,
        };
      },
      providesTags: [TagTypes.division],
    }),

    getSingleBlog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.division],
    }),

    updateBlog: build.mutation({
      query: (Data) => ({
        url: `${BLOG_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    deleteBlog: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.division],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = divisionApi;
