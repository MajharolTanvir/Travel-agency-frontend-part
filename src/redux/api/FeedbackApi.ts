import { IFeedback, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedback";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeedback: build.mutation({
      query: (Data) => ({
        url: `${FEEDBACK_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    getAllFeedback: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${FEEDBACK_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IFeedback[], meta: IMeta[]) => {
        return {
          feedback: response,
          meta,
        };
      },
      providesTags: [TagTypes.division],
    }),

    getSingleFeedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.division],
    }),

    updateFeedback: build.mutation({
      query: (Data) => ({
        url: `${FEEDBACK_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.division],
    }),

    deleteFeedback: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.division],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetSingleFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = divisionApi;
