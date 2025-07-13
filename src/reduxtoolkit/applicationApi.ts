import { mainApi, Tags } from "./mainApi";
import { objectToQueryString } from "../utils"

const applicationApi = mainApi.injectEndpoints({
  endpoints: build => ({
    fetchApplications: build.query({
      query: (params) => {
        const queryString = objectToQueryString(params);
        return {
          url: "/application" + queryString,
          method: "GET",
        }
      },
      transformErrorResponse: error => {
        console.log("error")
        return error;
      },
      providesTags: [`${Tags.ApplicationList}`]
    }),
    createApplication: build.mutation({
      query: params => {
        return {
          url: "/application",
          method: "POST",
          body: params
        }
      },
      transformErrorResponse: error => {
        console.log("error")
        return error;
      },
    }),
    updateApplicationStatus: build.mutation({
      query: params => {
        return {
          url: "/application/status",
          method: "PUT",
          body: params
        }
      },
      transformErrorResponse: error => {
        console.log("error")
        return error;
      },      
      invalidatesTags: [`${Tags.ApplicationList}`]
    }),
    uploadFile: build.mutation({
      query: (formData) => ({
        url: "/files/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
export const { useFetchApplicationsQuery, useCreateApplicationMutation, useUpdateApplicationStatusMutation, useUploadFileMutation } = applicationApi;