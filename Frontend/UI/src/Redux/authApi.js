import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("AdminToken");

      if (adminToken) {
        headers.set("Authorization", adminToken);
      } else if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Rooms", "Bookings", "MyBookings"],
  endpoints: (builder) => ({
    // Admin Authentication
    adminAuth: builder.mutation({
      query: (credentials) => ({
        url: "/admin/auth",
        method: "POST",
        body: credentials,
      }),
    }),

    // User Signup mutation
    signup: builder.mutation({
      query: (userData) => ({
        url: "/",
        method: "POST",
        body: userData,
      }),
    }),

    // User Signin mutation
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/api/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    // Get Rooms query
    getRooms: builder.query({
      query: () => "/HotelApi/rooms",
      providesTags: ["Rooms"],
    }),

    // Book Room mutation
    bookRoom: builder.mutation({
      query: ({ roomId, bookingData }) => ({
        url: `/booking/book/${roomId}`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings", "Rooms", "MyBookings"],
    }),

    // Admin: Get All Bookings
    getAllBookings: builder.query({
      query: () => "/admin/allBookings",
      providesTags: ["Bookings"],
    }),

    // Admin: Cancel Booking
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/admin/cancelBooking/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings", "MyBookings"],
    }),

    // User: Get My Bookings
    getMyBookings: builder.query({
      query: () => "/booking/mybookings",
      providesTags: ["MyBookings"],
    }),

    // User: Cancel My Booking
    cancelMyBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/booking/cancel/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyBookings", "Bookings"],
    }),

    // Admin: Add Room (with file upload)
    addRoom: builder.mutation({
      query: (roomData) => {
        const formData = new FormData();
        formData.append("roomImage", roomData.imageUrl);
        formData.append("roomName", String(roomData.roomName));
        formData.append("description", String(roomData.description));
        formData.append("price", String(roomData.price));
        formData.append("roomType", String(roomData.roomType));
        formData.append("numberofbed", String(roomData.numberofbed));

        return {
          url: "/admin/add-room",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Rooms"],
    }),

    // Admin: Update Room
    updateRoom: builder.mutation({
      query: ({ id, roomData }) => ({
        url: `/admin/roomUpdate/${id}`,
        method: "PUT",
        body: {
          roomName: String(roomData.roomName),
          description: String(roomData.description),
          price: String(roomData.price),
          roomType: String(roomData.roomType),
          numberofbed: String(roomData.numberofbed),
        },
      }),
      invalidatesTags: ["Rooms"],
    }),

    // Admin: Delete Room
    deleteRoom: builder.mutation({
      query: (roomName) => ({
        url: "/admin/roomDelete",
        method: "DELETE",
        body: { roomName },
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useAdminAuthMutation,
  useSignupMutation,
  useSigninMutation,
  useGetRoomsQuery,
  useBookRoomMutation,
  useGetAllBookingsQuery,
  useCancelBookingMutation,
  useGetMyBookingsQuery,
  useCancelMyBookingMutation,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = authApi;
