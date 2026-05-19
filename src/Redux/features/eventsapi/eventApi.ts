import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Events"],
    }),
    // ✅ FIXED: Get ALL EVENTS (with pagination)
    getAllEventsByUser: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/events",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Events"],
    }),
    // Get Event by ID
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: ["Events"],
    }),

    //  Get Event for Guest (NEW)
    getGuestEvent: builder.query({
      query: ({ id, uploadToken, guestId }) => ({
        url: `/guest/events/${id}`,
        method: "GET",
        params: {
          uploadToken,
          ...(guestId && { guestId }), // optional
        },
      }),
    }),
    // guest upload image
    eventGuestUploadImage: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/events/upload/${token}`,
        method: "POST",
        body: formData,
      }),
    }),
    //  renamed endpoint (UPLOAD IMAGES)
    GetAllGustIamgePublic: builder.query({
      query: ({ id, uploadToken, guestId }) => ({
        url: `/guest/events/${id}`,
        method: "GET",
        params: {
          uploadToken,
          ...(guestId && { guestId }),
        },
      }),
    }),
     toggleDeactivateEvent: builder.mutation({
      query: (id: number) => ({
        url: `/events/${id}/toggle-deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsByUserQuery,
  useGetEventByIdQuery,
  useGetGuestEventQuery,
  useEventGuestUploadImageMutation,
  useGetAllGustIamgePublicQuery,
  useToggleDeactivateEventMutation
} = eventApi;
