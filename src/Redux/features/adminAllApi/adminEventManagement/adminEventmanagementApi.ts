import { baseApi } from "@/Redux/api/baseApi";

const adminEventmanagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL EVENTS
    getAllEventsByAdmin: builder.query({
      query: (params) => ({
        url: "/admin/events",
        method: "GET",
        params,
      }),
      providesTags: ["Events"],
    }),

    // GET EVENT BY ID
    getEventDetailsByAdmin: builder.query({
      query: (id) => ({
        url: `/admin/events/${id}`,
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    // get all event image by admin
    getAllEventImagesByAdmin: builder.query({
      query: ({ id, ...params }) => ({
        url: `/admin/events/${id}/images`,
        method: "GET",
        params, // page, limit,  যাবে এখান দিয়ে
      }),
      providesTags: ["Events"],
    }),
    // deleted event by admin
    deleteEventByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsByAdminQuery,
  useGetEventDetailsByAdminQuery,
  useGetAllEventImagesByAdminQuery,
  useDeleteEventByAdminMutation
} = adminEventmanagementApi;
