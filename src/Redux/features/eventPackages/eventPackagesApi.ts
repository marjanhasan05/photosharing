import { baseApi } from "../../api/baseApi";

const eventPackagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET all event packages
    getEventPackages: builder.query<any[], void>({
      query: () => ({
        url: "/event-packages",
        method: "GET",
      }),
      providesTags: ["EventPackages"],
    }),

    // 🔹 CREATE event package (admin)
    createEventPackage: builder.mutation<any, any>({
      query: (data) => ({
        url: "/admin/event-packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EventPackages"],
    }),
  }),
});

export const {
  useGetEventPackagesQuery,
  useCreateEventPackageMutation,
} = eventPackagesApi;