import { IBookedHotel, IMeta } from "@/types";
import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKED_ROOM_URL = "/booked-hotel";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookedRoom: build.mutation({
      query: (Data) => ({
        url: `${BOOKED_ROOM_URL}`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [TagTypes.hotel],
    }),

    getAllBookedRoom: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${BOOKED_ROOM_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBookedHotel[], meta: IMeta[]) => {
        return {
          hotel: response,
          meta,
        };
      },
      providesTags: [TagTypes.hotel],
    }),

    getSingleBookedRoom: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKED_ROOM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.hotel],
    }),

    updatedBookedRoom: build.mutation({
      query: (Data) => ({
        url: `${BOOKED_ROOM_URL}/${Data.id}`,
        method: "PATCH",
        data: Data.values,
      }),
      invalidatesTags: [TagTypes.hotel],
    }),

    deleteBookedRoom: build.mutation({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKED_ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.hotel],
    }),
  }),
});

export const {
    useBookedRoomMutation,
    useGetAllBookedRoomQuery,
    useGetSingleBookedRoomQuery,
    useUpdatedBookedRoomMutation,
    useDeleteBookedRoomMutation
} = hotelApi;
