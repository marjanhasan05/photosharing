import { baseApi } from "@/Redux/api/baseApi";

export const downloadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Image Download
    downloadDirectImage: builder.mutation({
      // 👈 query → mutation
      query: ({ imageId, token }) => ({
        url: `/guest/images/${imageId}/download`,
        method: "GET",
        params: { token },
        responseHandler: async (response: Response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Download failed");
          }
          return response.blob();
        },
      }),
    }),

    // here download zip
    downloadImagesZip: builder.mutation({
      query: (data) => ({
        url: "/guest/events/images/download",
        method: "POST",
        body: data,
        responseHandler: async (response: any) => {
          if (!response.ok) {
            // If error, try to parse as JSON to get the error message
            const errorText = await response.text();
            throw new Error(errorText || "Download failed");
          }
          return response.blob();
        },
      }),
    }),
  }),
});

export const { useDownloadDirectImageMutation, useDownloadImagesZipMutation } =
  downloadApi;
