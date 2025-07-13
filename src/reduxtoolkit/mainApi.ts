import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils";

const base_url = "http://localhost:8080/api";

export const Tags = Object.freeze({
  ApplicationList: "ApplicationList",
} as const);

export const mainApi = createApi({
  tagTypes: [`${Tags.ApplicationList}`],
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});
