import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = process.env.REACT_APP_BASE_URL

export const publicApiSlice = createApi({
    reducerPath: 'publicApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: builder => ({
      getAllUsers: builder.query({
        query: () => '/auth/users/'
      })
    })
  })
  
export const { useGetAllUsersQuery } = publicApiSlice