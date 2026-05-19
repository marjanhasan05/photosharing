import { baseApi } from "@/Redux/api/baseApi";

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEventPackage: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/event-packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EventPackages"],
    }),
    updateEventPackage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/event-packages/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["EventPackages"], // adjust as needed
    }),
    deleteEventPackage: builder.mutation({
      query: (id) => ({
        url: `/admin/event-packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventPackages"],
    }),
  }),
});

export const { useCreateEventPackageMutation, useUpdateEventPackageMutation,useDeleteEventPackageMutation } =
  planApi;
