import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { tagTypeList } from "../tagTypes";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
