import { apiSlice } from "./api";

export const apiPropertiesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => "/properties",
      keepUnusedDataFor: 70000,
    }),
  }),
});

export const { useGetPropertiesQuery } = apiPropertiesSlice;
