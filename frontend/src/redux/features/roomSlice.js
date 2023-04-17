import { apiSlice } from '../api/apiSlice'




export const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      rooms: builder.query({
        query: () => `/chat/rooms/`,
        providesTags: (result, error, arg) => [{ type:'rooms', id:'list' }]
      }),
      roomPage: builder.query({
        query: (room_id) => `/chat/rooms/${room_id}/`,
        providesTags: (result, error, arg) => [{ type:'rooms', id:arg }]
      }),
      createRoom: builder.mutation({
        query:(roomObj) => ({
          url: `/chat/rooms/`,
          method: 'POST',
          body: roomObj
      }),
      invalidatesTags: (result, error, id) => [{ type:'rooms', id:'list' }],
      })
    })
  })


  export const { 
    useRoomsQuery,
    useRoomPageQuery,
    useCreateRoomMutation
    } = roomApiSlice