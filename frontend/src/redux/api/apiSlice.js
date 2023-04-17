import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, tokenReceived } from '../features/userSlice';

const baseURL = process.env.REACT_APP_BASE_URL

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().userState.user.token?.access
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers
    },
  })

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const oldRefreshToken = api.getState().userState.user.token?.refresh
    const refreshTokenResponse = await  fetch(`${baseURL}/auth/refresh-token/`, {
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':oldRefreshToken})
      })
      if (!refreshTokenResponse.ok) {
        api.dispatch(logout())
          return;
          }
      const refreshedToken = await refreshTokenResponse.json()
      api.dispatch(tokenReceived(refreshedToken))

      result = await baseQuery(args, api, extraOptions)

      return result

  }
  return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery:baseQueryWithReauth,
    endpoints: builder => ({
      getUsers: builder.query({
        query: () => '/auth/users/'
      })
    })
  })
  
  export const { useGetUsersQuery } = apiSlice



